<template>
  <div class="min-h-screen">
    <md-linear-progress class="fixed right-0 left-0 top-0 min-w-full z-[1]" :indeterminate="store.isLoading" />

    <Maintenence v-if="store.isMaintenance" />
    <div v-else>
      <VNavigationRail
        :class="{ 'hidden': !route.path.startsWith('/admin'), 'translate-x-0': route.path.startsWith('/admin') && !route.path.endsWith('/login') }"
        class="fixed top-0 bottom-0 -translate-x-[80px]"
        :selected="(route.params.tab as string | undefined) || 'dashboard'"
        :destinations="store.rails"
        @select="id => store.selectedRail = id"
      />
      
      <div class="flex flex-col min-h-screen justify-between">
        <VAppBar :class="{ 'pl-0 md:pl-[80px]': route.path.startsWith('/admin') && !route.path.endsWith('/login') }" transparent />
        <router-view v-slot="{ Component }">
          <Transition name="slide-fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </router-view>
        <VFooter :class="{ 'flex-grow': route.name === 'Admin' || (store.isLoggedIn && route.name === 'My Orders') }" />
      </div>
    </div>

    <DialogMain v-for="data in dialogs" :key="data.id" :data="data" @close="data.cancel" />
  </div>
</template>

<script lang="ts" setup>
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
import { Env } from './config';
import { toast } from 'vue3-toastify';
import { useStore, useDialog } from './store';
import { Endpoints, makeRequest } from './network/request';

import "@material/web/progress/linear-progress";

import VAppBar from './components/VAppBar.vue';
import VFooter from './components/VFooter.vue';
import DialogMain from './components/dialogs/DialogMain.vue';
import VNavigationRail from "./components/VNavigationRail.vue";
import Maintenence from './pages/Maintenance.vue';
import { Icon } from "./utils/icon";

// Get store
const store = useStore();
const route = useRoute();
const dialog = useDialog();

type Rail = {
  id: string;
  icon: Icon;
  title: string;
};

// Create rails
const rails: Rail[] = [
  { id: "dashboard", icon: "dashboard", title: "Dashboard" },
  { id: "announcements", icon: "campaign", title: "Announce" },
  { id: "events", icon: "event", title: "Events" },
  { id: "products", icon: "deployed_code", title: "Products" },
  { id: "students", icon: "groups", title: "Students" },
  { id: "orders", icon: "shopping_cart", title: "Orders" },
  { id: "env", icon: "tune", title: "Variables" },
  { id: "settings", icon: "settings", title: "Settings" },
];

// Set rails
store.rails = rails;

// Queue of dialogs
const dialogs = ref();

watch(dialog.queue, q => {
  dialogs.value = q;
});

if (!store.isMaintenance) { 
  store.isLoading = true;

  // Fetch courses
  makeRequest<string[], null>("GET", Endpoints.Courses, null, response => {
    if (response.success) {
      store.courses = response.data;
      return;
    }
  });
  
  makeRequest<Record<string, string> | string, null>("GET", Endpoints.Env, null, response => {
    store.isLoading = false;
  
    if (response.success) {
      if (typeof response.data !== "string") {
        for (const key in response.data) {
          Env[key] = response.data[key];
        }
      }

      return;
    }
  
    toast.error(response.message);
  
    if (response.data === "UNAUTHORIZED") {
      store.isLoggedIn = false;
      store.isAdminLoggedIn = false;
      store.isUnivStudentLoggedIn = false;
    }
  });
}
</script>