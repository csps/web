<template>
  <div class="bg-surface-container-low rounded-2xl p-6 relative" role="button">
    <md-ripple />
    <div class="flex gap-5">
      <div class="text-on-surface-variant w-full">
        <div class="flex justify-between gap-6 w-full">
          <div>
            <h3 class="body-medium font-medium mb-2 flex items-center gap-1 text-primary">
              {{ product.name }}
            </h3>
            <p class="text-secondary body-small text-justify">{{ product.description }}</p>
          </div>
          <div class="mt-0.5 body-small flex flex-col justify-between items-end">
            #{{ product.id }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "@material/web/icon/icon";
import "@material/web/ripple/ripple";

defineProps<{
  product: ProductModel;
}>();
</script>
