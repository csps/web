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
      <h3 class="hidden lg:block xl:block text-on-surface-variant">UC Main Computing Society of the Philippines - Students</h3>
      <h3 class="block lg:hidden xl:hidden text-on-surface-variant">UC Main CSP-S</h3>

      <!-- Navigation Links -->
      <div class="flex items-center gap-5 flex-grow justify-end">

        <div class="xl:flex justify-end space-x-5 hidden">
          <router-link v-for="link in NAV_LINKS" :key="link.path" :to="link.path" tabindex="-1">
            <md-icon-button :title="link.name" :selected="link.path === route.path">
              <md-icon slot="selected" class="text-primary" v-html="icon(link.icon)" />
              <md-icon v-html="icon(link.icon, true)" />
            </md-icon-button>
          </router-link>

          <router-link v-if="store.isLoggedIn" to="/profile" tabindex="-1">
            <md-icon-button title="Profile" :selected="route.path === '/profile'">
              <md-icon slot="selected" class="text-primary" v-html="icon('person')" />
              <md-icon v-html="icon('person', true)" />
            </md-icon-button>
          </router-link>

          <router-link v-else-if="!store.isAdminLoggedIn" to="/login" tabindex="-1">
            <md-icon-button title="Login" :selected="route.path === '/login'">
              <md-icon slot="selected" class="text-primary" v-html="icon('login')" />
              <md-icon v-html="icon('login')" />
            </md-icon-button>
          </router-link>

          <router-link v-if="store.isAdminLoggedIn" to="/admin" tabindex="-1">
            <md-icon-button title="Admin" :selected="route.path.startsWith('/admin')">
              <md-icon slot="selected" class="text-primary" v-html="icon('security')" />
              <md-icon v-html="icon('security')" />
            </md-icon-button>
          </router-link>
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

import "@material/web/switch/switch";
import "@material/web/icon/icon";
import "@material/web/menu/menu";
import "@material/web/menu/menu-item";
import "@material/web/iconbutton/icon-button"

import { getHistoryLength } from '~/utils/page';
import { setDarkMode } from '~/utils/theme';
import { getStore } from '~/utils/storage';
import { icon } from '~/utils/icon';

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
</style>

