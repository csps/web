<template>
  <md-dialog
    :open="isDialogOpen"
    @close="close"
    :scrim-click-action="null"
    :escape-key-action="null"
  >
    <div slot="headline">{{ announcement ? 'Update' : 'Add' }} Announcement</div>
    <div slot="content">
      <md-filled-text-field
        class="w-full mb-5"
        label="Title"
        v-model.trim="title"
        :disabled="isLoading"
        @keydown.enter="submit"
      >
        <md-icon slot="leading-icon" v-html="icon('tune', true)" />
      </md-filled-text-field>
      <md-filled-text-field
        class="w-full"
        label="Content"
        type="textarea"
        rows="5"
        v-model.trim="content"
        :disabled="isLoading"
        @keydown.enter="submit"
      >
        <md-icon slot="leading-icon" v-html="icon('tune', true)" />
      </md-filled-text-field>
      
      <div v-if="(announcement?.photos_id || 0) > 0" class="flex justify-center mt-6" :class="{ 'mb-4': preservePhoto }">
        <label>
          <md-checkbox @change="onCheckboxChange" :checked="preservePhoto" />
          <span class="ml-4">Preserve photo</span>
        </label>
      </div>
      
      <Transition name="slide-fade" mode="out-in">
        <div v-if="!preservePhoto || !announcement?.photos_id" class="mt-5">
          <p v-if="(announcement?.photos_id || 0) > 0" class="mb-2 text-on-surface-variant body-small text-center">Note: If you don't attach a photo, the current photo will be removed.</p>
          <input @change="onFilePut" type="file" class="file-input" pattern="image/*" accept="image/*" />
        </div>
      </Transition>
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
import "@material/web/checkbox/checkbox";
import "@material/web/textfield/filled-text-field";

import { ref, computed, watch } from "vue";
import { toast } from "vue3-toastify";
import { icon } from "~/utils/icon";
import { Endpoints, makeRequest } from "~/network/request";
import { AnnouncementRequest } from "~/types/request";

const emit = defineEmits(["update:modelValue", "done"]);
const props = defineProps<{
  modelValue: boolean;
  announcement?: AnnouncementModel
}>();

const isLoading = ref(false);
const isDialogOpen = computed(() => props.modelValue);
const preservePhoto = ref(true);
const title = ref();
const content= ref();
const photo = ref();

watch(isDialogOpen, (value) => {
  if (value) {
    preservePhoto.value = true;
    title.value = props.announcement?.title;
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
    preservePhoto: preservePhoto.value && (props.announcement?.photos_id || 0) > 0
  };

  if (props.announcement) {
    data.id = props.announcement.id;
  }

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
 * Handle checkbox change
 */
function onCheckboxChange(event: Event) {
  preservePhoto.value = (event.target as HTMLInputElement).checked;
}

/**
 * Handle file input
 */
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
  title.value = "";
  content.value = "";
  preservePhoto.value = true;
  photo.value = undefined;
  emit("update:modelValue", false);
}
</script>

<style lang="scss" scoped>
.file-input {
  @apply bg-surface-container-highest file:bg-surface-container py-2 pl-2;
}
</style>