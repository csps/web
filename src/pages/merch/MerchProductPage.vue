<template>
  <div class="container mx-auto p-6 w-full lg:w-full xl:w-3/4 h-full flex-col flex justify-center text-on-surface-variant">

    <Transition name="slide-fade" mode="out-in">
      <div class="flex flex-col justify-center items-center h-full" v-if="product === null || isLoading">
        <div class="flex justify-center gap-5" v-if="isLoading">
          <md-circular-progress indeterminate />
          <p class="mt-3">Fetching product data...</p>
        </div>
  
        <div class="surface error" v-else>
          {{ message }}
        </div>
      </div>
  
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-10 justify-center h-full w-full">
        
        <div class="bg-surface-container-low rounded-2xl px-6 flex justify-center items-center h-full">
          <VImage v-if="product?.thumbnail && product?.thumbnail > 0" :src="getPhotoLink(product.thumbnail)" :alt="product.name" />
          <ImageTemplate class="w-full" v-else />
        </div>

        <div>
          <div class="flex justify-between mb-6">
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

          <div class="mb-6">
            <p class="body-medium bg-surface-container-low p-6 rounded-xl">
              {{ product?.description }}
            </p>
          </div>

          <div class="mb-6">
            <div class="flex gap-2">
              <md-filter-chip label="Standard" selected />
              <div v-if="product?.variations && product.variations.length > 0" class="body-medium font-medium flex gap-2">
                <md-filter-chip
                  v-for="variant in product.variations"
                  :key="variant.id"
                  :label="variant.name"
                  disabled
                />
              </div>
            </div>
          </div>

          <div class="my-6 flex flex-col gap-2">
            <md-outlined-select v-model="quantity" :disabled="!hasStock" label="Quantity" class="w-min" quick>
              <md-icon slot="leadingicon" v-html="icon('deployed_code', true)" />
              <md-select-option
                v-for="i in (hasStock ? product?.max_quantity : 1)"
                :key="i"
                :value="i"
                :headline="i"
              />
            </md-outlined-select>

            <p v-if="!hasStock" class="body-medium text-error">
              Product is out of stock. It's expected to be back in stock soon.
            </p>
          </div>

          <div class="mb-6 flex flex-end gap-3">
            <md-filter-chip
              :disabled="!hasStock"
              :selected="mop === ModeOfPayment.WALK_IN"
              @click="hasStock ? mop = ModeOfPayment.WALK_IN : null"
              label="Walk-in"
            >
              <md-icon slot="icon" v-html="icon('footprint', true)" />
            </md-filter-chip>
            <md-filter-chip
              :disabled="!hasStock"
              :selected="mop === ModeOfPayment.GCASH"
              @click="hasStock ? mop = ModeOfPayment.GCASH : null"
              label="GCash"
            >
              <md-icon slot="icon" v-html="icon('qr_code', true)" />
            </md-filter-chip>
          </div>

          <div>
            <md-filled-button :disabled="!hasStock" @click="order">
              {{ hasStock ? "Order" : "Out of stock" }}
            </md-filled-button>
          </div>
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
import { ModeOfPayment } from "~/types/enums";

import "@material/web/icon/icon";
import "@material/web/divider/divider";
import "@material/web/button/filled-button";
import "@material/web/button/text-button";
import "@material/web/progress/circular-progress";
import "@material/web/iconbutton/icon-button";
import "@material/web/select/outlined-select";
import "@material/web/select/select-option";
import "@material/web/chips/filter-chip";

import VImage from '~/components/VImage.vue';
import ImageTemplate from '~/composables/ImageTemplate.vue';

const store = useStore();
const route = useRoute();

const product = ref<ProductResponse | null>();
const hasStock = computed(() => product.value?.stock !== undefined && product.value?.stock > 0);
const quantity = ref();
const mop = ref();

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
    // Set quantity
    quantity.value = response.data?.max_quantity || 1;
    // Set mop
    mop.value = product.value.stock > 0 ? ModeOfPayment.WALK_IN : -1;
  });
});

function order() {
  if (!hasStock.value) {
    toast.error("Product is out of stock!");
    return;
  }

  // If not logged in
  if (!store.isLoggedIn) {
    // Open dialog for acquiring user information
    toast.info("TODO: Open dialog for acquiring user information");
    return;
  }

  toast.success("Will order");
}
</script>
