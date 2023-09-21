<template>
  <md-dialog
    :open="isDialogOpen"
    @close="close"
    :scrim-click-action="isLoading ? '' : 'close'"
    :escape-key-action="isLoading ? '' : 'close'"
  >
    <div slot="headline">Change password</div>
    <div class="grid gap-6" slot="content">
      <md-filled-text-field
        class="w-full"
        label="New Password"
        v-model.trim="newPassword"
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
      <md-text-button @click="submit" :disabled="isLoading" autofocus>
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
import { StudentEnum } from "~/types/models";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const newPassword = ref("");
const confirmPassword = ref("");

const isLoading = ref(false);
const isDialogOpen = computed(() => props.modelValue);

/**
 * Send the email
 */
function submit() {
  // If all fields are empty
  if (!newPassword.value || !confirmPassword.value) {
    toast.info("Empty fields.");
    return;
  }

  // If new password and confirm password are not the same
  if (newPassword.value !== confirmPassword.value) {
    toast.info("Oops! Passwords doesn't match.");
    return;
  }

  // If already loading, return
  if (isLoading.value) return;
  isLoading.value = true;
  
  // Send the request
  makeRequest("PUT", Endpoints.StudentsKey, { 
    key: StudentEnum.password,
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
  // Reset the fields
  newPassword.value = "";
  confirmPassword.value = "";

  emit("update:modelValue", false);
}
</script>