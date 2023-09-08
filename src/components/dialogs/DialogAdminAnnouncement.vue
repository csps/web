<template>
  <md-dialog
    :open="isDialogOpen"
    @close="close"
    :scrim-click-action="null"
    :escape-key-action="null"
  >
    <div slot="headline">{{ announcement ? 'Updaate' : 'Add' }} Announcment</div>
    <div slot="content">
      <md-filled-text-field
        class="w-full mb-5"
        label="Title"
        v-model.trim="title"
        :disabled="isLoading"
        @keydown.enter="submit"
      >
        <md-icon slot="leadingicon" v-html="icon('tune', true)" />
      </md-filled-text-field>
      <md-filled-text-field
        class="w-full"
        label="Content"
        type="textarea"
        v-model.trim="content"
        :disabled="isLoading"
        @keydown.enter="submit"
      >
        <md-icon slot="leadingicon" v-html="icon('tune', true)" />
      </md-filled-text-field>
  
      <input @change="onFilePut" type="file" class="mt-5 file-input" pattern="image/*" accept="image/*" />
    </div>
    <div class="space-x-1" slot="actions">
      <md-text-button @click="close" :disabled="isLoading">Cancel</md-text-button>
      <md-text-button @click="submit" :disabled="!title || !content || isLoading" autofocus>
        {{ announcement ? (isLoading ? "Updating..." : "Update") : (isLoading ? 'Adding...' : 'Add') }}
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
import { AnnouncementRequest } from "~/types/request";

const emit = defineEmits(["update:modelValue", "done"]);
const props = defineProps<{
  modelValue: boolean;
  announcement?: {
    title: string,
    content: string
  }
}>();

const isLoading = ref(false);
const isDialogOpen = computed(() => props.modelValue);
const title = ref("");
const content= ref();
const photo = ref();

watch(isDialogOpen, (value) => {
  if (value) {
    content.value = props.announcement?.content;
  }
});

/**
 * Send the email
 */
function submit() {
  // If already loading, return
  if (isLoading.value) return;
  isLoading.value = true;

  const data: AnnouncementRequest = {
    title: title.value,
    content: content.value,
  };

  if (photo.value) {
    data.photo = photo.value;
  }
  
  // Send the request
  makeRequest(props.announcement ? "PUT" : "POST", props.announcement ? Endpoints.AnnouncementsId : Endpoints.Announcements, data, response => {
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
    photo.value = undefined;
    return;
  }

  photo.value = file;
}
</script>

<style lang="scss" scoped>
.file-input {
  @apply bg-surface-container-highest file:bg-surface-container py-2 pl-2;
}
</style>