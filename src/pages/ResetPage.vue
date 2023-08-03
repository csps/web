<template>
  <div class="container mx-auto px-6 flex items-center justify-center">
    <!-- Verifying -->
    <div v-if="isVerifying" class="text-center">
      <md-linear-progress indeterminate />
      <p class="mt-4">Verifying reset token...</p>
    </div>

    <!-- Is failed -->
    <div v-else-if="isFailed" class="surface error text-center">
      <h4 class="title-large mb-2">Oops!</h4>
      {{ message }}
    </div>

    <!-- Is success -->
    <div v-else>
      <h2 class="text-2xl md:text-3xl font-bold mb-1 text-on-surface-variant">Reset your password</h2>
      <h6 class="mb-8 text-sm">Create a new password that you'll remember.</h6>

      <div class="flex flex-col gap-3">
        <!-- New password-->
        <md-outlined-text-field
          label="New password"
          :type="isPassVisible ? 'text' : 'password'"
          v-model.trim="newPassword"
          @keydown.enter="submit"
          :disabled="isLoading || isSuccess"
          maxLength="24"
          required
        >
          <md-icon slot="leadingicon" v-html="icon('lock', true)" />
          <md-standard-icon-button slot="trailingicon" @click="isPassVisible = !isPassVisible" toggle>
            <md-icon v-html="icon('visibility_off', true)" />
            <md-icon slot="selectedIcon" v-html="icon('visibility', true)" />
          </md-standard-icon-button>
        </md-outlined-text-field>

        <!-- Confirm password -->
        <md-outlined-text-field
          label="Confirm password"
          :type="isConfirmPassVisible ? 'text' : 'password'"
          v-model.trim="confirmPassword"
          @keydown.enter="submit"
          :disabled="isLoading || isSuccess"
          maxLength="24"
          required
        >
          <md-icon slot="leadingicon" v-html="icon('lock', true)" />
          <md-standard-icon-button slot="trailingicon" @click="isConfirmPassVisible = !isConfirmPassVisible" toggle>
            <md-icon v-html="icon('visibility_off', true)" />
            <md-icon slot="selectedIcon" v-html="icon('visibility', true)" />
          </md-standard-icon-button>
        </md-outlined-text-field>

        <!-- Submit -->
        <md-filled-button :disabled="isLoading || isSuccess" @click="submit">
          {{ isSuccess ? 'Reset password success!' : (isLoading ? 'Resetting password...' : 'Reset password') }}
        </md-filled-button>
      </div>

      <p class="text-primary text-center mt-5" v-if="isSuccess">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "@material/web/progress/linear-progress";
import "@material/web/textfield/outlined-text-field";
import "@material/web/button/filled-button";

import { Endpoints, makeRequest } from "~/network/request";
import { ref, onMounted } from "vue";
import { icon } from "~/utils/icon";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";

const route = useRoute();
const message = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

const isVerifying = ref(true);
const isFailed = ref(false);
const isPassVisible = ref(false);
const isConfirmPassVisible = ref(false);
const isSuccess = ref(false);
const isLoading = ref(false);

onMounted(() => {
  makeRequest("GET", Endpoints.ResetPasswordToken, {
    token: route.params.token
  }, response => {
    isVerifying.value = false;
    isFailed.value = !response.success;
    message.value = response.message;
  });
});

/**
 * Submit reset password form
 */
function submit() {
  // If already loading, return
  if (isLoading.value) return;
  isLoading.value = true;

  // Check if password is at least 8 characters
  if (newPassword.value.length < 8) {
    toast.info("Password must be at least 8 characters");
    isLoading.value = false;
    return;
  }
  
  // Check if passwords match
  if (newPassword.value !== confirmPassword.value) {
    toast.info("Passwords do not match");
    isLoading.value = false;
    return;
  }

  // Make request
  makeRequest("POST", Endpoints.ResetPassword, {
    token: route.params.token,
    new_password: newPassword.value
  }, response => {
    isLoading.value = false;
    message.value = response.message
    isSuccess.value = response.success;

    if (response.success) {
      toast.success(response.message);
      return;
    }

    toast.error(response.message);
  });
}
</script>