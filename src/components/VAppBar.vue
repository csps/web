<template>
  <div class="appbar">
    <div class="container mx-auto px-4 flex items-center space-x-5 h-full">
      <!-- Back button -->
      <md-standard-icon-button v-if="store.isShowBackButton" @click="back">
        <md-icon v-html="icon('arrow_back')" />
      </md-standard-icon-button>

      <!-- Logos -->
      <div class="logos">
        <img class="hidden sm:inline" :src="CCSLogo" alt="CCS Logo" />
        <img :src="CSPSLogo" alt="CSPS Logo" />
        <img class="hidden sm:inline" :src="UCLogo" alt="UC Logo" />
      </div>

      <!-- Title -->
      <h3 class="hidden lg:block xl:hidden 2xl:block text-on-surface-variant">UC Main Computing Society of the Philippines - Students</h3>
      <h3 class="block lg:hidden xl:block 2xl:hidden text-on-surface-variant">UC Main CSP-S</h3>

      <!-- Navigation Links -->
      <div class="flex items-center gap-5 flex-grow justify-end">

        <div class="xl:flex justify-end space-x-5 hidden">
          <router-link v-for="link in NAV_LINKS" :key="link.path" :to="link.path">
            <md-standard-icon-button :title="link.name">
              <md-icon v-html="icon(link.icon, true)" />
            </md-standard-icon-button>
          </router-link>

          <md-standard-icon-button v-if="store.isLoggedIn" title="Logout" @click="openLogoutDialog">
            <md-icon v-html="icon('logout')" />
          </md-standard-icon-button>

          <router-link to="/login" v-else>
            <md-standard-icon-button title="Login">
              <md-icon v-html="icon('login')" />
            </md-standard-icon-button>
          </router-link>
        </div>

        <md-switch @change="onThemeChange" :selected="store.isDark" icons />

        <!-- Drawer Button -->
        <div class="flex justify-end xl:hidden">
          <md-standard-icon-button ref="menu" @click="isMenuOpen = !isMenuOpen">
            <md-icon v-html="icon('menu')" />
          </md-standard-icon-button>
        </div>
      </div>
    </div>

    <md-menu
      fixed has-overflow quick
      anchor-corner="END_START"
      :open="isMenuOpen"
      :anchor="menu"
      @closed="isMenuOpen = false"
    >
      <md-menu-item
        v-for="link in NAV_LINKS"
        :key="link.path"
        :to="link.path === '/login' && store.isLoggedIn ? undefined : link.path"
        :headline="link.path === '/login' ? (store.isLoggedIn ? 'Logout' : 'Login') : link.name"
      />
    </md-menu>
  </div>
</template>

<script lang="ts" setup>
import CCSLogo from '~/assets/img/ccs_logo.png';
import CSPSLogo from '~/assets/img/csps_logo.png';
import UCLogo from '~/assets/img/uc_logo.png';

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Env, NAV_LINKS } from "~/config";
import { useStore, useDialog } from "~/store";

import "@material/web/switch/switch";
import "@material/web/icon/icon";
import "@material/web/menu/menu";
import "@material/web/menu/menu-item";
import "@material/web/iconbutton/standard-icon-button"

import { getHistoryLength, removeLocal } from '~/utils/page';
import { setDarkMode } from '~/utils/theme';
import { getItem } from '~/utils/string';
import { icon } from '~/utils/icon';

import Strings from '~/config/strings';

defineProps({
  transparent: {
    type: Boolean,
    default: false
  },
});

onMounted(() => {
  store.isDark = getItem("dark") === "1";
  setDarkMode(store.isDark);
});

const dialog = useDialog();
const store = useStore();
const router = useRouter();
const menu = ref();
const isMenuOpen = ref(false);

function onThemeChange() {
  store.isDark = !store.isDark;
  setDarkMode(store.isDark);
}

function openLogoutDialog() {
  // User-friendly logout message
  dialog.open(Strings.LOGOUT_DIALOG_TITLE, Strings.LOGOUT_DIALOG_MESSAGE, {
    text: "Logout",
    click: () => {
      // Set loading to true
      store.isLoading = true;
      // Clear local storage
      removeLocal("token");
      // Set logged out
      store.isLoggedIn = false;
      // Redirect to login
      router.push({ name: "Login" });
      // Set loading to false
      store.isLoading = false;
      // Close dialog
      dialog.hide();
    }
  });
}

function back() {
  router.back();
  store.isShowBackButton = getHistoryLength() - Env.initialHistoryLength > 0;
}
</script>

<style lang="scss" scoped>
.logos {
  @apply flex space-x-2;

  img {
    @apply w-11;
  }
}

.appbar {
  @apply relative h-20 z-10;
}

h3 {
  @apply text-base font-medium;
}
</style>

