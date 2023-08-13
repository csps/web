<template>
  <md-dialog
    :open="isDialogOpen"
    @close="close"
    :scrim-click-action="isLoading ? '' : 'close'"
    :escape-key-action="isLoading ? '' : 'close'"
  >
    <div slot="headline">Change password</div>
    <div class="grid gap-1" slot="content">
      <md-filled-text-field
        class="w-full"
        label="Old Password"
        v-model.trim="password"
        maxLength="24"
        type="password"
        :disabled="isLoading"
        @keydown.enter="submit"
        required
      >
        <md-icon slot="leadingicon" v-html="icon('lock', true)" />
      </md-filled-text-field>
      <md-filled-text-field
        class="w-full"
        label="New Password"
        v-model.trim="newPassword"
        maxLength="24"
        type="password"
        :disabled="isLoading"
        @keydown.enter="submit"
        required
      >
        <md-icon slot="leadingicon" v-html="icon('lock', true)" />
      </md-filled-text-field>
      <md-filled-text-field
        class="w-full"
        label="Confirm Password"
        v-model.trim="confirmPassword"
        maxLength="24"
        type="password"
        :disabled="isLoading"
        @keydown.enter="submit"
        required
      >
        <md-icon slot="leadingicon" v-html="icon('lock', true)" />
      </md-filled-text-field>
    </div>
    <div class="space-x-1" slot="actions">
      <md-text-button @click="close" :disabled="isLoading">Cancel</md-text-button>
      <md-text-button @click="submit" :disabled="newPassword.length < 8 || newPassword !== confirmPassword || isLoading" autofocus>
        {{ isLoading ? "Changing password..." : "Change password" }}
      </md-text-button>
    </div>
  </md-dialog>
</template>

<script lang="ts" setup>
import "@material/web/dialog/dialog";
import "@material/web/textfield/filled-text-field";

import { ref, computed } from "vue";
import { toast } from "vue3-toastify";
import { icon } from "~/utils/icon";
import { Endpoints, makeRequest } from "~/network/request";
import { StudentType } from "~/types/models";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const password = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

const isLoading = ref(false);
const isDialogOpen = computed(() => props.modelValue);

/**
 * Send the email
 */
function submit() {
  // If already loading, return
  if (newPassword.value.length < 8 || newPassword.value !== confirmPassword.value || isLoading.value) return;
  isLoading.value = true;

  // If all fields are empty
  if (!password.value || !newPassword.value || !confirmPassword.value) {
    toast.info("Empty fields.");
    isLoading.value = false;
    return;
  }

  // Send the request
  makeRequest("PUT", Endpoints.StudentsKey, { 
    key: StudentType.password,
    oldpass: password.value,
    newpass: newPassword.value,
    cnfpass: confirmPassword.value
  }, response => {
    // Set loading to false
    isLoading.value = false;

    // If success
    if (response.success) {
      toast.success(response.message);
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
</script>