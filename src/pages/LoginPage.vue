<template>
  <div class="container mx-auto px-6 py-12">
    <div class="flex items-center justify-center w-full h-full">
      <div class="">
        <h2 class="text-2xl md:text-3xl font-bold mb-1 text-on-surface-variant">Welcome back, <span class="text-primary">ComSciPeepS</span></h2>
        <h6 class="text-sm">To login, please enter your details.</h6>

        <div class="flex flex-col gap-1 mt-8">
          <md-outlined-text-field
            :disabled="isLoggingIn"
            label="Student ID"
            type="text"
            maxLength="8"
            hasLeadingIcon="true"
            @keydown.enter="login"
            v-model.trim="id"
            required
          >
            <md-icon slot="leadingicon" v-html="icon('verified', true)" />
          </md-outlined-text-field>

          <md-outlined-text-field
            :disabled="isLoggingIn"
            label="Password"
            :type="isPasswordVisible ? 'text' : 'password'"
            maxLength="24"
            v-model.trim="password"
            @keydown.enter="login"
            required
          >
            <md-icon slot="leadingicon" v-html="icon('lock', true)" />
            <md-standard-icon-button slot="trailingicon" @click="isPasswordVisible = !isPasswordVisible" toggle>
              <md-icon v-html="icon('visibility_off', true)" />
              <md-icon slot="selectedIcon" v-html="icon('visibility', true)" />
            </md-standard-icon-button>
          </md-outlined-text-field>
        </div>

        <div class="flex justify-between items-center">
          <label class="flex items-center text-sm">
            <md-checkbox :disabled="isLoggingIn" />
            Remember Me
          </label>
          <md-text-button variant="dense" :disabled="isLoggingIn">
            Forgot Password?  
          </md-text-button>
        </div>

        <div class="flex justify-center mt-3">
          <md-filled-button @click="login" class="w-full" :disabled="isLoggingIn">
            {{ isLoggingIn ? 'Logging in...' : 'Login' }}
          </md-filled-button>
        </div>

        <md-divider class="mt-6 mb-2" />

        <div class="flex flex-col justify-center gap-10">
          <md-text-button class="secondary" :disabled="isLoggingIn">
            Don't have an account? Register here.
          </md-text-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "@material/web/textfield/outlined-text-field";
import "@material/web/iconbutton/standard-icon-button";
import "@material/web/button/filled-button";
import "@material/web/button/text-button";
import "@material/web/checkbox/checkbox";
import "@material/web/divider/divider";

import { ref } from "vue";
import { icon } from "~/utils/icon";
import { Endpoints, makeRequest } from "~/network/request";
import { toast } from "vue3-toastify";

const id = ref("");
const password = ref("");

const isLoggingIn = ref(false);
const isPasswordVisible = ref(false);

/**
 * Login to the system
 */
function login() {
  // If id is empty
  if (!id.value) {
    toast.info("Empty student ID");
    return;
  }

  // If password is empty
  if (!password.value) {
    toast.info("Empty password");
    return;
  }

  // If already logging in
  if (isLoggingIn.value) return;
  isLoggingIn.value = true;
  
  // Make request to server
  makeRequest("POST", Endpoints.Login, {
    id: id.value,
    password: password.value
  }, (response) => {
    isLoggingIn.value = false;

    // if success
    if (response.success) {
      toast.success("Login successful!");
    }
  });
}
</script>