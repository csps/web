<template>
  <div class="h-full">
    <md-linear-progress class="fixed right-0 left-0 top-0" :indeterminate="store.isLoading" />

    <div class="grid grid-cols-1 h-full">
      <VAppBar transparent />
      <router-view v-slot="{ Component }">
        <Transition name="slide-fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
      <VFooter />
    </div>

    <DialogMain />
  </div>
</template>

<script lang="ts" setup>
import VAppBar from './components/VAppBar.vue';
import VFooter from './components/VFooter.vue';
import DialogMain from './dialogs/DialogMain.vue';

import { useStore } from './store';
import { isLoginValid } from './utils/network';
import { removeLocal } from './utils/page';

import "@material/web/progress/linear-progress";

// Get store
const store = useStore();

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
</script>