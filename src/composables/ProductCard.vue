<template>
  <div class="product overflow-hidden">
    <div class="w-60 h-60">
      <VImage
        class="rounded-xl overflow-hidden"
        v-if="product?.thumbnail && product.thumbnail > 0"
        :src="getPhotoLink(product.thumbnail)"
        :alt="product.name"
      />
  
      <ImageTemplate class="h-full" v-else />
    </div>

    <!-- <div class="absolute right-2 top-2 flex flex-col justify-center items-center gap-1">
      <md-icon-button title="Like" toggle>
        <md-icon v-html="icon('favorite', true)" />
        <md-icon slot="selectedIcon" v-html="icon('favorite')" />
      </md-icon-button>
    </div> -->

    <div class="content py-5">
      <p class="text-sm text-error mb-3" v-if="!product.stock || product.stock <= 0">Out of stock</p>
      <div class="flex">
        <div class="w-full">
          <h4>{{ product.name }}</h4>
          <h3>&#8369; {{ product.price }}</h3>
        </div>
        <div class="flex justify-end items-center">
          <router-link :to="'/merch/' + product.id" tabindex="-1" title="View merch">
            <md-filled-tonal-button trailingIcon>
              View
            </md-filled-tonal-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { icon } from "~/utils/icon";
import { getPhotoLink } from "~/utils/network";

import "@material/web/icon/icon";
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
  @apply flex flex-col justify-between relative bg-surface-container rounded-xl;

  .content {
    @apply px-5 font-medium;

    h4 {
      @apply text-on-surface-variant mb-2;
    }

    h3 {
      @apply text-base;
    }
  }
}
</style>