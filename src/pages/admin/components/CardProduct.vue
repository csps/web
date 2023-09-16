<template>
  <div class="bg-surface-container-low rounded-2xl p-6 relative">
    <div class="flex gap-5">
      <div class="text-on-surface-variant w-full">
        <div class="flex justify-between gap-6 w-full">
          <div>
            <h3 class="body-medium font-medium mb-2 flex items-center gap-1 text-primary">
              <span class="border-b border-dashed border-transparent hover:border-primary" title="Edit product" role="button" @click="emit('edit')">
                {{ product.name }}
              </span>
            </h3>
            <p class="text-secondary body-small text-justify">{{ product.description }}</p>
          </div>
          <div class="mt-0.5 body-small flex flex-col justify-center items-end">
            <md-switch
              @change="emit('status', product.id)"
              :selected="!!product.is_available"
              icons
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "@material/web/icon/icon";
import "@material/web/switch/switch";
import "@material/web/button/filled-tonal-button";

defineProps<{
  product: ProductModel;
}>();

const emit = defineEmits(["edit", "status"]);
</script>
