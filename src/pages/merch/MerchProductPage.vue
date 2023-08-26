<template>
  <div class="container mx-auto p-6 w-full lg:w-full xl:w-3/4 3xl:w-3/5 h-full flex-col flex justify-center text-on-surface-variant">

    <Transition name="slide-fade" mode="out-in">
      <div class="flex flex-col justify-center items-center h-full" v-if="product === null || isLoading">
        <div class="flex flex-col items-center justify-center gap-5" v-if="isLoading">
          <md-linear-progress indeterminate />
          <p>Fetching product...</p>
        </div>
        
        <div class="flex justify-center flex-col items-center gap-5" v-else>
          <div class="surface error">
            {{ message }}
          </div>
          
          <md-text-button @click="router.back()">
            <md-icon slot="icon" v-html="icon('arrow_back')" />
            Go back
          </md-text-button>
        </div>
      </div>
  
      <div v-else class="flex flex-col lg:flex-row gap-10 justify-center h-full w-full">
        
        <div class="rounded-2xl px-6 flex justify-center items-center h-full">
          <div class="h-[400px] w-[400px]">
            <VImage v-if="photo > 0" :src="getPhotoLink(photo)" :alt="variation ? variation.name : (product?.name || '')" />
            <ImageTemplate class="h-full w-full" v-else />
          </div>
        </div>

        <div class="flex flex-col gap-6">
          <div class="flex justify-between gap-6">
            <div>
              <h2 class="headline-small mb-1 font-medium">{{ product?.name }}</h2>
              <h4 class="title-large">
                {{ product ? toCurrency(product.price) : 'Invalid price' }}
              </h4>
            </div>
            <div>
              <md-icon-button toggle>
                <md-icon v-html="icon('favorite', true)" />
                <md-icon slot="selectedIcon" v-html="icon('favorite')" />
              </md-icon-button>
            </div>
          </div>

          <p class="body-medium bg-surface-container p-6 rounded-xl">
            {{ product?.description }}
          </p>

          <div class="flex gap-4 items-center justify-center md:justify-start"> 
            <p class="title-medium">
              <span v-if="variation ? variation.stock > 0 : (product?.stock && product.stock > 0)">
                <span class="font-medium">{{ variation ? variation.stock : product?.stock }}</span> stocks left
              </span>
              <span class="text-error font-medium" v-else>
                We're out of stock! :(
              </span>
            </p>
          </div>

          <div v-if="product?.variations && product.variations.length > 0" class="body-medium font-medium flex justify-center md:justify-start gap-2">
            <md-filter-chip
              v-for="variant in product.variations"
              :key="variant.id"
              :label="variant.name + (variant.stock <= 0 ? ' (Out of stock)' : '')"
              :selected="variant.id === variation?.id"
              @click="variant.stock <= 0 ? '' : variation?.id === variant.id ? variation = undefined : variation = variant"
              :disabled="variant.stock <= 0"
            />
          </div>

          <div class="flex flex-col md:items-end justify-center gap-5">
            <md-filled-button :disabled="!hasStock" @click="checkout">
              <md-icon v-if="hasStock" slot="icon" v-html="icon('shopping_cart_checkout')" />
              {{ hasStock ? "Checkout" : "Out of stock" }}
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
import { ref, onMounted, computed, watch } from 'vue';
import { Endpoints, makeRequest } from '~/network/request';
import { getPhotoLink } from '~/utils/network';
import { toast } from 'vue3-toastify';
import { ModeOfPayment } from "~/types/enums";
import { useRouter } from 'vue-router';

import "@material/web/icon/icon";
import "@material/web/divider/divider";
import "@material/web/button/filled-button";
import "@material/web/progress/linear-progress";
import "@material/web/iconbutton/icon-button";
import "@material/web/chips/filter-chip";

import VImage from '~/components/VImage.vue';
import ImageTemplate from '~/composables/ImageTemplate.vue';
import { toCurrency } from '~/utils/string';

const store = useStore();
const route = useRoute();
const router = useRouter();

const hasStock = computed(() => product.value?.stock !== undefined && product.value?.stock > 0);

const product = ref<ProductModel | null>();
const variation = ref<ProductVariationModel | undefined>();
const mop = ref();

const photo = ref();
const message = ref("");
const isLoading = ref(true);

watch(variation, v => {
  if (v === undefined) {
    photo.value = product.value?.thumbnail || 0;
    return;
  }

  photo.value = v.photos_id || 0;
});

onMounted(() => {
  // Set loading to true
  store.isLoading = true;

  // Get product by id
  makeRequest<ProductModel>("GET", Endpoints.ProductsId, {
    id: route.params.id,
  }, response => {
    // Set loading to false
    store.isLoading = false;
    isLoading.value = false;
    // Set product
    product.value = response.data || null;
    // Set message
    message.value = response.message;

    // Stop if product is null
    if (product.value === null) return;

    // Set page title
    setPageTitle(product.value.name || "Product");
    // Set mop
    mop.value = product.value.stock > 0 ? ModeOfPayment.WALK_IN : -1;

    // If has thumbnail
    if (product.value.thumbnail && product.value.thumbnail > 0) {
      // Set photo
      photo.value = product.value.thumbnail;
    }
  });
});

function checkout() {
  if (!hasStock.value) {
    toast.error("Product is out of stock!");
    return;
  }

  if (!product.value) {
    toast.info("Oops! There's something went wrong while checkout this product.");
    return;
  }

  // Set checkout details
  store.checkoutDetails = {
    product: product.value
  };

  // If has variation
  if (variation.value) {
    // Set variation
    store.checkoutDetails.variant = variation.value;
  }

  // Redirect to checkout page
  router.push({ name: "Checkout" });
}
</script>

<style lang="scss" scoped>
md-text-button {
  --md-sys-color-primary: var(--md-sys-color-error);
}
</style>