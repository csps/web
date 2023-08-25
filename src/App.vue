<template>
  <div class="min-h-screen">
    <md-linear-progress class="fixed right-0 left-0 top-0 min-w-full" :indeterminate="store.isLoading" />

    <div class="flex flex-col min-h-screen" v-if="store.errorMessage.length === 0" :class="{ 'justify-between': route.name !== 'Admin'  }">
      <VAppBar transparent />
      <router-view v-slot="{ Component }">
        <Transition name="slide-fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
      <VFooter :class="{ 'flex-grow': route.name === 'Admin' }" />
    </div>

    <div class="flex justify-center items-center min-h-screen" v-else>
      <div class="surface error">
        {{ store.errorMessage }}
      </div>
    </div>
    
    <DialogMain />
  </div>
</template>

<script lang="ts" setup>
import VAppBar from './components/VAppBar.vue';
import VFooter from './components/VFooter.vue';
import DialogMain from './components/dialogs/DialogMain.vue';
import { Endpoints, makeRequest } from './network/request';
import { Env } from './config';
import { useRoute } from "vue-router";

import { useStore } from './store';
import { isLoginValid } from './utils/network';
import { removeLocal } from './utils/page';

import "@material/web/progress/linear-progress";

// Get store
const store = useStore();
const route = useRoute();

store.isLoading = true;

makeRequest<any>("GET", Endpoints.Config, null, response => {
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

    return;
  }

  store.errorMessage = response.message;
});


</script>