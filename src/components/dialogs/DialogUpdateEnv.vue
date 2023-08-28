<template>
  <md-dialog
    :open="isDialogOpen"
    @close="close"
    :scrim-click-action="isLoading ? '' : 'close'"
    :escape-key-action="isLoading ? '' : 'close'"
  >
    <div slot="headline">Update Variable</div>
    <div slot="content">
      <p class="mb-3">{{ capitalize(name) }}</p>
      <md-filled-text-field
        class="w-full"
        label="Value"
        v-model.trim="newValue"
        :disabled="isLoading"
        @keydown.enter="submit"
      >
        <md-icon slot="leadingicon" v-html="icon('tune', true)" />
      </md-filled-text-field>
    </div>
    <div class="space-x-1" slot="actions">
      <md-text-button @click="close" :disabled="isLoading">Cancel</md-text-button>
      <md-text-button @click="submit" :disabled="isLoading" autofocus>
        {{ isLoading ? "Updating..." : "Update" }}
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
import { useStore } from "~/store";
import { Endpoints, makeRequest } from "~/network/request";
import { capitalize } from "~/utils/string";
import { Env } from "~/config";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const store = useStore();
const isLoading = ref(false);
const isDialogOpen = computed(() => props.modelValue);
const newValue= ref();

watch(isDialogOpen, (value) => {
  if (value) {
    newValue.value = props.value;
  }
});

/**
 * Send the email
 */
function submit() {
  // If already loading, return
  if (isLoading.value) return;
  isLoading.value = true;

  // Send the request
  makeRequest("PUT", Endpoints.EnvKey, { 
    key: props.name,
    value: newValue.value
  }, response => {
    // Set loading to false
    isLoading.value = false;

    // If success
    if (response.success) {
      store.isLoading = true;
      toast.success(response.message);

      makeRequest<any>("GET", Endpoints.Env, null, response => {
        store.isLoading = false;

        if (response.success) {
          for (const key in response.data) {
            Env[key] = response.data[key];
          }
        }
  
        toast.error(response.message);
        close();
      });

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
</script>