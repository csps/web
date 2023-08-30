<template>
  <div class="min-h-screen">
    <md-linear-progress class="fixed right-0 left-0 top-0 min-w-full z-[1]" :indeterminate="store.isLoading" />

    <div class="flex flex-col min-h-screen" :class="{ 'justify-between': route.name !== 'Admin'  }">
      <VAppBar transparent />
      <router-view v-slot="{ Component }">
        <Transition name="slide-fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
      <VFooter :class="{ 'flex-grow': route.name === 'Admin' }" />
    </div>

    <DialogMain />
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { Env } from './config';
import { useStore } from './store';
import { removeLocal } from './utils/page';
import { toast } from 'vue3-toastify';
import { Endpoints, makeRequest } from './network/request';
import { isAdminLoginValid, isLoginValid } from './utils/network';

import "@material/web/progress/linear-progress";

import VAppBar from './components/VAppBar.vue';
import VFooter from './components/VFooter.vue';
import DialogMain from './components/dialogs/DialogMain.vue';

// Get store
const store = useStore();
const route = useRoute();

store.isLoading = true;

makeRequest<any>("GET", Endpoints.Env, null, response => {
  store.isLoading = false;

  if (response.success) {
    for (const key in response.data) {
      Env[key] = response.data[key];
    }

    // Check if login is valid
    isLoginValid(valid => {
      // Set loading to false
      store.isLoading = false;

      // If is valid
      if (valid) {
        // Set logged in
        store.isLoggedIn = true;
        // return
        return;
      }

      // If not valid, clear local storage
      removeLocal("token");
      // Set logged out
      store.isLoggedIn = false;
    });

    isAdminLoginValid(isAdminLoginValid => {
      /// Set loading to false
      store.isLoading = false;

      // If is valid
      if (isAdminLoginValid) {
        // Set admin logged in
        store.isAdminLoggedIn = true;
        // return
        return;
      }

      // If not valid, clear local storage
      removeLocal("csps_token");
      // Set logged out
      store.isAdminLoggedIn = false;
    });

    return;
  }

  toast.error(response.message);

  if (response.data === "UNAUTHORIZED") {
    removeLocal("token");
    removeLocal("csps_token");
    store.isLoggedIn = false;
    store.isAdminLoggedIn = false;
  }
});


</script>