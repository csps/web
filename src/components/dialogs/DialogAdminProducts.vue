<template>
  <md-dialog
    :open="isDialogOpen"
    @close="close"
    :scrim-click-action="null"
    :escape-key-action="null"
  >
    <div slot="headline">{{ product ? 'Update' : 'Add' }} Product</div>
    <div slot="content" class="space-y-5">
      <md-filled-text-field
        class="w-full"
        label="Name"
        v-model.trim="name"
        :disabled="isLoading"
        @keydown.enter="submit"
      >
        <md-icon slot="leadingicon" v-html="icon('deployed_code', true)" />
      </md-filled-text-field>
      <md-filled-text-field
        class="w-full"
        label="Description"
        type="textarea"
        v-model.trim="description"
        :disabled="isLoading"
        @keydown.enter="submit"
      >
        <md-icon slot="leadingicon" v-html="icon('tune', true)" />
      </md-filled-text-field>

      <div class="grid grid-cols-2  gap-5">
        <md-filled-text-field v-model="stock" label="Stock" type="number">
          <md-icon slot="leadingicon" v-html="icon('tune', true)" />
        </md-filled-text-field>

        <md-filled-text-field v-model="price" label="Price" type="number">
          <md-icon slot="leadingicon" v-html="icon('tune', true)" />
        </md-filled-text-field>
      </div>

      <md-filled-text-field v-model="max_quantity" label="Max quantity" type="number" class="w-full">
        <md-icon slot="leadingicon" v-html="icon('tune', true)" />
      </md-filled-text-field>
  
      <input @change="onFilePut" type="file" class="mt-5 file-input" pattern="image/*" accept="image/*" />
    </div>
    <div class="space-x-1" slot="actions">
      <md-text-button @click="close" :disabled="isLoading">Cancel</md-text-button>
      <md-text-button @click="submit" :disabled="!canAdd || isLoading" autofocus>
        {{ product ? (isLoading ? "Updating..." : "Update") : (isLoading ? 'Adding...' : 'Add') }}
      </md-text-button>
    </div>
  </md-dialog>
</template>

<script lang="ts" setup>
import "@material/web/dialog/dialog";
import "@material/web/textfield/filled-text-field";

import { ref, computed, watch } from "vue";
import { toast } from "vue3-toastify";
import { icon } from "~/utils/icon";
import { Endpoints, makeRequest } from "~/network/request";

const emit = defineEmits(["update:modelValue", "done"]);
const props = defineProps<{
  modelValue: boolean;
  product?: ProductModel
}>();

const isLoading = ref(false);
const isDialogOpen = computed(() => props.modelValue);
const canAdd = computed(() => name.value && description.value && price.value > 0 && stock.value >= 0 && max_quantity.value > 0);
const thumbnail = ref();
const name = ref();
const description = ref();
const price = ref(0);
const max_quantity = ref(1);
const stock = ref(0);

watch(isDialogOpen, (value) => {
  if (value) {
    name.value = props.product?.name;
    description.value = props.product?.description;
    price.value = props.product?.price || 0;
    max_quantity.value = props.product?.max_quantity || 1;
    stock.value = props.product?.stock || 0;
    thumbnail.value = props.product?.thumbnail;
  }
});

/**
 * Send the email
 */
function submit() {
  // If already loading, return
  if (isLoading.value) return;
  isLoading.value = true;

  const data: any = {
    name: name.value,
    max_quantity: max_quantity.value,
    description: description.value,
    price: price.value,
    stock: stock.value,
    variations: "", // TODO: Add variations
  };

  if (props.product) {
    data.thumbnail = thumbnail.value;
    data.id = props.product.id;
  }

  // Send the request
  makeRequest(props.product ? "PUT" : "POST", props.product ? Endpoints.ProductsId : Endpoints.Products, data, response => {
    // Set loading to false
    isLoading.value = false;

    // If success
    if (response.success) {
      toast.success(response.message);
      emit("done");
      close();
      return;
    }

    // Otherwise, show error
    toast.error(response.message);
  });
}

/**
 * Close the dialog
 */
function close() {
  emit("update:modelValue", false);
}

function onFilePut(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  
  if (!file) {
    thumbnail.value = undefined;
    return;
  }

  thumbnail.value = file;
}
</script>

<style lang="scss" scoped>
.file-input {
  @apply bg-surface-container-highest file:bg-surface-container py-2 pl-2;
}
</style>