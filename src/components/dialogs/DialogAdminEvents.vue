<template>
  <md-dialog
    :open="isDialogOpen"
    @close="close"
    :scrim-click-action="isLoading ? '' : 'close'"
    :escape-key-action="isLoading ? '' : 'close'"
  >
    <div slot="headline">Add Event</div>
    <div slot="content" class="space-y-5">
      <md-filled-text-field
        class="w-full"
        label="Title"
        v-model.trim="title"
        :disabled="isLoading"
        @keydown.enter="submit"
      >
        <md-icon slot="leadingicon" v-html="icon('campaign', true)" />
      </md-filled-text-field>
      <md-filled-text-field
        class="w-full"
        label="Description"
        v-model.trim="description"
        :disabled="isLoading"
        @keydown.enter="submit"
      >
        <md-icon slot="leadingicon" v-html="icon('tune', true)" />
      </md-filled-text-field>
      <md-filled-text-field
        class="w-full"
        label="Venue"
        v-model.trim="venue"
        :disabled="isLoading"
        @keydown.enter="submit"
      >
        <md-icon slot="leadingicon" v-html="icon('location_on', true)" />
      </md-filled-text-field>
      
      <div class="grid grid-cols-2 gap-5">
        <md-filled-text-field
          class="w-full"
          label="Start Date"
          v-model.trim="startDate"
          :disabled="isLoading"
          @keydown.enter="submit"
        >
          <md-icon slot="leadingicon" v-html="icon('event', true)" />
        </md-filled-text-field>
        <md-filled-text-field
          class="w-full"
          label="End Date"
          v-model.trim="endDate"
          :disabled="isLoading"
          @keydown.enter="submit"
        >
          <md-icon slot="leadingicon" v-html="icon('event', true)" />
        </md-filled-text-field>
      </div>

      <input @change="onFilePut" type="file" class="mt-5 file-input" pattern="image/*" accept="image/*" />
    </div>
    <div class="space-x-1" slot="actions">
      <md-text-button @click="close" :disabled="isLoading">Cancel</md-text-button>
      <md-text-button @click="submit" :disabled="isLoading" autofocus>
        {{ isLoading ? 'Adding...' : 'Add' }}
      </md-text-button>
    </div>
  </md-dialog>
</template>

<script lang="ts" setup>
import "@material/web/dialog/dialog";
import "@material/web/textfield/filled-text-field";

import { icon } from "~/utils/icon";
import { ref, computed } from "vue";
// import { toast } from "vue3-toastify";
// import { useStore } from "~/store";
// import { Endpoints, makeRequest } from "~/network/request";
// import { Env } from "~/config";

const emit = defineEmits(["update:modelValue", "done"]);
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  }
});

// const store = useStore();
const isLoading = ref(false);
const isDialogOpen = computed(() => props.modelValue);

const title = ref("");
const description = ref("");
const venue = ref("");
const startDate = ref("");
const endDate = ref("");
const photo = ref();

/**
 * Send the email
 */
function submit() {
  // // If already loading, return
  // if (isLoading.value) return;
  // isLoading.value = true;
  
  // // Send the request
  // makeRequest(isAdd.value ? "POST" : "PUT", isAdd.value ? Endpoints.Env : Endpoints.EnvKey, { 
  //   key: isAdd.value ? newName.value : props.name,
  //   value: newValue.value
  // }, response => {
  //   // Set loading to false
  //   isLoading.value = false;

  //   // If success
  //   if (response.success) {
  //     store.isLoading = true;
  //     toast.success(response.message);

  //     makeRequest<any>("GET", Endpoints.Env, null, response => {
  //       store.isLoading = false;

  //       if (response.success) {
  //         for (const key in response.data) {
  //           Env[key] = response.data[key];
  //         }

  //         emit("done");
  //         close();
  //         return;
  //       }

  //       toast.error(response.message);
  //       close();
  //     });

  //     return;
  //   }

  //   // Otherwise, show error
  //   toast.error(response.message);
  // });
}

function onFilePut(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  
  if (!file) {
    photo.value = undefined;
    return;
  }

  photo.value = file;
}

/**
 * Close the dialog
 */
function close() {
  emit("update:modelValue", false);
}
</script>

<style lang="scss" scoped>
.file-input {
  @apply bg-surface-container-highest file:bg-surface-container py-2 pl-2;
}
</style>