<template>
  <div class="container mx-auto px-6 py-12 flex items-center">
    <div class="flex items-center justify-center w-full h-full">
      <div class="">
        <h2 class="text-2xl md:text-3xl font-semibold mb-1 text-on-surface-variant">
          Welcome back, <span class="text-primary">ComSciPeepS</span>!
        </h2>
        <h6 class="text-sm">
          To login, please enter your credentials.
        </h6>

        <div class="flex flex-col gap-1 mt-10 mb-6">
          <md-filled-text-field
            :disabled="isLoggingIn"
            label="Student ID"
            type="text"
            maxLength="8"
            hasLeadingIcon="true"
            @keydown.enter="login"
            v-model.trim="id"
            required
          >
            <md-icon slot="leading-icon" v-html="icon('badge', true)" />
          </md-filled-text-field>

          <md-filled-text-field
            :disabled="isLoggingIn"
            label="Password"
            :type="isPasswordVisible ? 'text' : 'password'"
            v-model.trim="password"
            @keydown.enter="login"
            required
          >
            <md-icon slot="leading-icon" v-html="icon('lock', true)" />
            <md-icon-button slot="trailing-icon" tabindex="-1" @click="isPasswordVisible = !isPasswordVisible" toggle>
              <md-icon v-html="icon('visibility_off', true)" />
              <md-icon slot="selected" v-html="icon('visibility', true)" />
            </md-icon-button>
          </md-filled-text-field>
        </div>

        <div class="flex justify-between items-center my-3">
          <label class="flex items-center gap-3 text-sm">
            <md-checkbox @change="isRememberMe = !isRememberMe" :checked="isRememberMe" :disabled="isLoggingIn" />
            Remember Me
          </label>
          <md-text-button variant="dense" :disabled="isLoggingIn" @click="isForgotDialogOpen = true">
            Forgot Password?
          </md-text-button>
        </div>

        <div class="flex justify-end">
          <md-filled-button @click="login" class="w-1/3 hover:w-full transition-all duration-200 ease-in-out" :disabled="isLoggingIn">
            {{ isLoggingIn ? 'Logging in...' : 'Login' }}
          </md-filled-button>
        </div>

      </div>
    </div>

    <!-- Forgot Password dialog -->
    <DialogForgotPassword v-model="isForgotDialogOpen" />
  </div>
</template>

<script lang="ts" setup>
import "@material/web/textfield/filled-text-field";
import "@material/web/iconbutton/icon-button";
import "@material/web/button/filled-button";
import "@material/web/button/filled-tonal-button";
import "@material/web/button/text-button";
import "@material/web/checkbox/checkbox";
import "@material/web/divider/divider";

import { ref } from "vue";
import { icon } from "~/utils/icon";
import { toast } from "vue3-toastify";
import { useStore } from "~/store";
import { useRouter } from "vue-router";
import { Endpoints, makeRequest } from "~/network/request";
import { getStore, removeStore, setStore } from "~/utils/storage";
import { AuthType } from "~/types/enums";
import { LoginRequest } from "~/types/request";

import DialogForgotPassword from "~/components/dialogs/DialogForgotPassword.vue";

const store = useStore();
const router = useRouter();

const id = ref(getStore("login_id"));
const password = ref("");

const isLoggingIn = ref(false);
const isPasswordVisible = ref(false);
const isForgotDialogOpen = ref(false);
const isRememberMe = ref(getStore("login_id").length > 0);

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
  store.isLoading = true;
  
  // Make request to server
  makeRequest<StudentModel, LoginRequest>("POST", Endpoints.Login, {
    type: AuthType.STUDENT,
    student_id: id.value,
    password: password.value
  }, (response) => {
    isLoggingIn.value = false;
    store.isLoading = false;

    // if success
    if (response.success) {
      // If remember me is checked, save to local storage
      // If not, remove from local storage
      if (isRememberMe.value) {
        setStore("login_id", id.value);
      } else {
        removeStore("login_id");
      }

      // Set student
      store.user = response.data;
      // Set is logged in to true
      store.isLoggedIn = true;
      // Redirect to home page
      router.push({ name: "Home" });
      return;
    }

    toast.error(response.message);
  });
}
</script>