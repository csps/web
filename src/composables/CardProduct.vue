<template>
  <div class="product overflow-hidden">
    <md-ripple />
    <router-link :to="'/merch/' + product.id" tabindex="-1" :title="'View ' + product.name">
      <div class="flex h-64 w-64 items-center justify-center foreground object">
        <VImage
          class="rounded-xl"
          v-if="product?.thumbnail && product.thumbnail > 0"
          :src="getPhotoLink(product.thumbnail)"
          :alt="product.name"
        />
    
        <ImageTemplate class="h-full" v-else />
      </div>
  
      <div class="content py-5">
        <p class="text-sm text-error mb-3" v-if="!product.stock || product.stock <= 0">Out of stock</p>
        <div class="w-full">
          <h4>{{ product.name }}</h4>
          <h3>{{ toCurrency(product.price) }}</h3>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { getPhotoLink } from "~/utils/network";
import { toCurrency } from "~/utils/string";

import "@material/web/icon/icon";
import "@material/web/ripple/ripple";
import "@material/web/button/filled-tonal-button";
import "@material/web/iconbutton/icon-button";

import VImage from '../components/VImage.vue';
import ImageTemplate from './ImageTemplate.vue';

defineProps<{
  product: ProductModel
}>();
</script>

<style lang="scss" scoped>
.product {
  @apply flex flex-col justify-between relative bg-surface-container-low rounded-xl w-min;

  .foreground {
    @apply bg-surface-container rounded-xl;
  }

  .content {
    @apply px-5 font-medium rounded-2xl;

    h4 {
      @apply text-on-surface-variant mb-1;
    }

    h3 {
      @apply text-base;
    }
  }
}
</style>