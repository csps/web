<template>
  <div class="container mx-auto px-6 py-12 flex items-center">
    <div class="flex items-center justify-center w-full h-full">
      <div class="w-full sm:w-3/5 lg:w-2/5 xl:w-1/3 2xl:w-auto">
        <h2
          class="text-2xl md:text-3xl font-semibold mb-1 text-on-surface-variant"
          data-sal="zoom-in"
        >
          ICT Congress 2024 Admin
        </h2>
        <h6 class="text-sm" data-sal="zoom-in" data-sal-delay="50">
          Unauthorized access is strictly prohibited.
        </h6>

        <div class="flex flex-col gap-1 mt-5 mb-5">
          <md-outlined-text-field
            :disabled="isLoggingIn"
            label="Username"
            type="text"
            maxLength="16"
            hasLeadingIcon="true"
            @keydown.enter="login"
            v-model.trim="username"
            data-sal="zoom-in"
            data-sal-delay="100"
          >
            <md-icon slot="leading-icon" v-html="icon('badge', true)" />
          </md-outlined-text-field>

          <md-outlined-text-field
            :disabled="isLoggingIn"
            label="Password"
            :type="isPasswordVisible ? 'text' : 'password'"
            v-model.trim="password"
            @keydown.enter="login"
            data-sal="zoom-in"
            data-sal-delay="150"
          >
            <md-icon slot="leading-icon" v-html="icon('lock', true)" />
            <md-icon-button
              slot="trailing-icon"
              @click="isPasswordVisible = !isPasswordVisible"
              toggle
            >
              <md-icon v-html="icon('visibility_off', true)" />
              <md-icon slot="selected" v-html="icon('visibility', true)" />
            </md-icon-button>
          </md-outlined-text-field>
        </div>

        <div class="flex justify-end" data-sal="zoom-in" data-sal-delay="250">
          <md-filled-button
            @click="login"
            class="w-1/3"
            :disabled="isLoggingIn"
          >
            {{ isLoggingIn ? "Logging in..." : "Login" }}
          </md-filled-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useStore } from "~/store";
import { icon } from "~/utils/icon";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { Endpoints, makeRequest } from "~/network/request";
import { setStore } from "~/utils/storage";
import sal from "sal.js";

import "@material/web/icon/icon";
import "@material/web/textfield/outlined-text-field";
import "@material/web/iconbutton/icon-button";
import "@material/web/button/filled-button";

const store = useStore();
const router = useRouter();

const username = ref("");
const password = ref("");

const isLoggingIn = ref(false);
const isPasswordVisible = ref(false);

onMounted(() => {
  sal();

  // If has token, check if valid
  makeRequest<ICTAdminModel, null>("GET", Endpoints.ICTCongressLogin, null, response => {
    // If logged in
    if (response.success) {
      store.ictAdmin = response.data;
      store.isLoading = false;
      // Redirect to admin
      router.push("/ictcongress2024/admin");
      return;
    }

    // If not logged in
    store.isLoading = false;
  });
});

function login() {
  // If username is empty
  if (!username.value) {
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

  type LoginResponse = {
    admin: ICTAdminModel;
    accessToken: string;
    refreshToken: string;
  };

  type LoginRequest = {
    username: string;
    password: string;
  };

  // Make request to server
  makeRequest<LoginResponse, LoginRequest>("POST", Endpoints.ICTCongressLogin, {
      username: username.value,
      password: password.value,
    }, (response) => {
      isLoggingIn.value = false;
      store.isLoading = false;

      if (response.success) {
        // Save admin tokens to local storage
        setStore("iat", response.data.accessToken);
        setStore("irt", response.data.refreshToken);

        // Set store
        store.ictAdmin = response.data.admin;

        // Redirect to home page
        router.push({ name: "Admin - ICT Congress 2024" });
        return;
      }

      toast.error(response.message);
    }
  );
}
</script>
