<template>
  <div class="product">
    <md-focus-ring />
    <ImageTemplate />

    <div class="absolute right-2 top-2 flex flex-col justify-center items-center gap-1">
      <md-icon-button toggle>
        <md-icon v-html="icon('favorite', true)" />
        <md-icon slot="selectedIcon" v-html="icon('favorite')" />
      </md-icon-button>
    </div>

    <div class="content py-4">
      <div class="flex">
        <div class="w-full">
          <h4>{{ product.name }}</h4>
          <h3>&#8369;{{ product.price }}</h3>
        </div>
        <div class="flex justify-end view">
          <router-link :to="'/shop/' + product.id">
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
import { icon } from "~/utils/icon";

import "@material/web/icon/icon";
import "@material/web/button/filled-tonal-button";
import "@material/web/focus/md-focus-ring";
import "@material/web/iconbutton/icon-button";

import ImageTemplate from './ImageTemplate.vue';

defineProps<{
  product: ProductResponse
}>();
</script>

<style lang="scss" scoped>
.product {
  @apply relative bg-surface dark:bg-surface-container-low rounded-xl;

  .content {
    @apply px-4;

    h4 {
      @apply text-on-surface-variant text-sm mb-1;
    }

    h3 {
      @apply text-base font-medium;
    }
  }

  md-icon-button {
    --md-icon-button-icon-size: 20px;
  }

  .view md-icon {
    --md-icon-size: 18px;
  }
}
</style>