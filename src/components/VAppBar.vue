<template>
  <div class="h-20">
    <div class="container mx-auto px-4 flex items-center space-x-1 md:space-x-5 h-full">
      <!-- Back button -->
      <md-icon-button v-if="store.isShowBackButton" @click="back">
        <md-icon v-html="icon('arrow_back')" />
      </md-icon-button>

      <!-- Logos -->
      <div class="logos">
        <a href="http://ccs.uc.edu.ph/" target="_blank">
          <img class="hidden sm:inline" :src="CCSLogo" alt="CCS Logo" />
        </a>
        <a href="/" target="_self">
          <img :src="CSPSLogo" alt="CSPS Logo" />
        </a>
        <a href="https://uc.edu.ph" target="_blank">
          <img class="hidden sm:inline" :src="UCLogo" alt="UC Logo" />
        </a>
      </div>

      <!-- Title -->
      <h3 class="hidden xl:block text-on-surface-variant">UC Main Computing Society of the Philippines - Students</h3>
      <h3 class="block xl:hidden text-on-surface-variant">UC Main CSP-S</h3>

      <!-- Navigation Links -->
      <div class="flex items-center gap-5 flex-grow justify-end">
        <div class="xl:flex justify-end space-x-2 hidden">
          <md-tabs :selected="NAV_LINKS.findIndex(t => t.name === route.name)">
            <md-primary-tab v-for="link in NAV_LINKS.slice(0, 4)" :key="link.path" tabindex="-1" @click="router.push({ path: link.path })">
              <router-link class="link" :to="link.path">
                {{ link.name }}
              </router-link>
            </md-primary-tab>

            <md-primary-tab v-show="store.isLoggedIn" @click="router.push({ path: '/profile' })">
              <router-link class="link" to="/profile" tabindex="-1">
                Profile
              </router-link>
            </md-primary-tab>
            <md-primary-tab v-show="!store.isLoggedIn" @click="router.push({ path: '/login' })">
              <router-link class="link" to="/login" tabindex="-1">
                Login
              </router-link>
            </md-primary-tab>
            <md-primary-tab v-show="store.isAdminLoggedIn" @click="router.push({ path: '/admin' })">
              <router-link class="link" to="/admin" tabindex="-1">
                Admin
              </router-link>
            </md-primary-tab>
          </md-tabs>
        </div>

        <md-switch @change="onThemeChange" :selected="store.isDark" icons />

        <!-- Drawer Button -->
        <div class="flex justify-end xl:hidden">
          <md-icon-button id="appbar-menu" @click="isMenuOpen = !isMenuOpen">
            <md-icon v-html="icon('menu')" />
          </md-icon-button>
        </div>
      </div>
    </div>

    <md-menu
      fixed quick
      :open="isMenuOpen"
      anchor="appbar-menu"
      @closed="isMenuOpen = false"
      class="min-w-min"
      y-offset="8"
      anchor-corner="END_END"
      menu-corner="START_END"
    >
      <router-link
        v-for="link in NAV_LINKS"
        :key="link.path"
        :to="link.path"
      >
        <md-menu-item :headline="link.name" />
      </router-link>
      <router-link v-if="store.isLoggedIn" to="/profile" tabindex="-1">
        <md-menu-item headline="Profile" />
      </router-link>
      <router-link v-else-if="!store.isAdminLoggedIn" to="/login" tabindex="-1">
        <md-menu-item headline="Login" />
      </router-link>
      <router-link v-if="store.isAdminLoggedIn" to="/admin" tabindex="-1">
        <md-menu-item headline="Admin" />
      </router-link>
    </md-menu>
  </div>
</template>

<script lang="ts" setup>
import CCSLogo from '~/assets/img/ccs_logo.png';
import CSPSLogo from '~/assets/img/csps_logo.png';
import UCLogo from '~/assets/img/uc_logo.png';

import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Config, NAV_LINKS } from "~/config";
import { useStore } from "~/store";
import { getHistoryLength } from '~/utils/page';
import { setDarkMode } from '~/utils/theme';
import { getStore } from '~/utils/storage';
import { icon } from '~/utils/icon';

import "@material/web/switch/switch";
import "@material/web/icon/icon";
import "@material/web/menu/menu";
import "@material/web/menu/menu-item";
import "@material/web/tabs/tabs";
import "@material/web/tabs/primary-tab";
import "@material/web/iconbutton/icon-button"


defineProps({
  transparent: {
    type: Boolean,
    default: false
  },
});

onMounted(() => {
  store.isDark = getStore("dark") === "1";
  setDarkMode(store.isDark);
});

const store = useStore();
const route = useRoute();
const router = useRouter();
const isMenuOpen = ref(false);

function onThemeChange() {
  store.isDark = !store.isDark;
  setDarkMode(store.isDark);
}

function back() {
  router.back();
  store.isShowBackButton = getHistoryLength() - (Config.initialHistoryLength as number) > 0;
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
  @apply absolute top-0 left-0 right-0 h-20;
}

h3 {
  @apply text-base font-medium;
}

md-text-button {
  --md-sys-color-primary: var(--md-sys-color-on-surface-variant);
}

md-tabs {
  --md-primary-tab-container-color: transparent;
  --md-primary-tab-container-shape: 6px;
}

.link {
  @apply h-full flex items-center w-max;
}
</style>

