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
      <h3 class="hidden lg:block xl:hidden 2xl:block">UC Main Computing Society of the Philippines - Students</h3>
      <h3 class="block lg:hidden xl:block 2xl:hidden">UC Main CSP-S</h3>

      <!-- Navigation Links -->
      <div class="flex items-center gap-5 flex-grow justify-end">

        <md-switch @change="onThemeChange" :selected="store.isDark" icons />

        <div class="xl:flex justify-end space-x-5 hidden">
          <v-button
            v-for="link in NAV_LINKS"
            :key="link.path"
            :color="route.name === 'About' ? 'inverse' : 'primary'"
            :to="link.path"
          >
            {{ link.name }}
          </v-button>
        </div>

        <!-- Drawer Button -->
        <div class="flex justify-end xl:hidden">
          <v-button :icon="icon('menu')" :transparent="transparent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CCSLogo from '~/assets/img/ccs_logo.png';
import CSPSLogo from '~/assets/img/csps_logo.png';
import UCLogo from '~/assets/img/uc_logo.png';

import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Env, NAV_LINKS } from "~/config";
import { useStore } from "~/store";
import "@material/web/switch/switch";
import "@material/web/icon/icon";
import "@material/web/iconbutton/standard-icon-button"

import { getHistoryLength } from '~/utils/page';
import { setDarkMode } from '~/utils/theme';
import { getItem } from '~/utils/string';
import { icon } from '~/utils/icon';

import VButton from "~/components/VButton.vue";

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

const store = useStore();
const route = useRoute();
const router = useRouter();

function onThemeChange() {
  store.isDark = !store.isDark;
  setDarkMode(store.isDark);
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

