<template>
  <div class="product overflow-hidden">
    <div class="flex-grow">
      <VImage
        class="rounded-xl overflow-hidden h-full"
        v-if="product?.thumbnail && product.thumbnail > 0"
        :src="getPhotoLink(product.thumbnail)"
        :alt="product.name"
      />
  
      <ImageTemplate v-else />
    </div>

    <!-- <div class="absolute right-2 top-2 flex flex-col justify-center items-center gap-1">
      <md-icon-button title="Like" toggle>
        <md-icon v-html="icon('favorite', true)" />
        <md-icon slot="selectedIcon" v-html="icon('favorite')" />
      </md-icon-button>
    </div> -->

    <div class="content py-4">
      <div class="flex">
        <div class="w-full">
          <h4>{{ product.name }}</h4>
          <h3>&#8369;{{ product.price }}</h3>
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
import { getPhotoLink } from "~/utils/network";

import "@material/web/icon/icon";
import "@material/web/button/filled-tonal-button";
import "@material/web/iconbutton/icon-button";

import VImage from '../components/VImage.vue';
import ImageTemplate from './ImageTemplate.vue';

defineProps<{
  product: ProductResponse
}>();
</script>

<style lang="scss" scoped>
.product {
  @apply flex flex-col relative bg-surface-container-low rounded-xl;

  .content {
    @apply px-4 font-medium;

    h4 {
      @apply text-on-surface-variant text-sm mb-2;
    }

    h3 {
      @apply text-base;
    }
  }
}
</style>