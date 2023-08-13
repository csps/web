<template>
  <md-dialog
    :open="isDialogOpen"
    @close="close"
    :scrim-click-action="isLoading ? '' : 'close'"
    :escape-key-action="isLoading ? '' : 'close'"
  >
    <div slot="headline">Forgot your password?</div>
    <div slot="content">
      <p class="mb-3">Enter your student ID and we'll send you an email to reset your password.</p>
      <md-filled-text-field
        class="w-full"
        label="Student ID"
        v-model.trim="studentID"
        maxLength="8"
        :disabled="isLoading"
        @keydown.enter="submit"
        required
      >
        <md-icon slot="leadingicon" v-html="icon('badge', true)" />
      </md-filled-text-field>
    </div>
    <div class="space-x-1" slot="actions">
      <md-text-button @click="close" :disabled="isLoading">Cancel</md-text-button>
      <md-text-button @click="submit" :disabled="studentID.length !== 8 || isLoading" autofocus>
        {{ isLoading ? "Sending..." : "Send" }}
      </md-text-button>
    </div>
  </md-dialog>
</template>

<script lang="ts" setup>
import "@material/web/dialog/dialog";

import { ref, computed } from "vue";
import { toast } from "vue3-toastify";
import { icon } from "~/utils/icon";
import { Endpoints, makeRequest } from "~/network/request";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const studentID = ref("");
const isLoading = ref(false);
const isDialogOpen = computed(() => props.modelValue);

/**
 * Send the email
 */
function submit() {
  // If already loading, return
  if (isLoading.value) return;
  isLoading.value = true;

  // Check if student ID is empty
  if (!studentID.value) {
    toast.info("Empty student ID");
    isLoading.value = false;
    return;
  }

  // If student ID length is not 8 or contains non-numeric characters
  if (studentID.value.length !== 8 || !/^\d+$/.test(studentID.value)) {
    toast.info("Invalid student ID");
    isLoading.value = false;
    return;
  }

  // Send the request
  makeRequest("POST", Endpoints.ForgotPassword, { 
    student_id: studentID.value
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