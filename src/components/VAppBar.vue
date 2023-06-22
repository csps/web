<template>
  <div class="appbar" :class="[ transparent ? 'bg-transparent' : 'bg-primary' ]">
    <div class="container mx-auto px-4 flex items-center space-x-5 h-full">

      <!-- Back button -->
      <Transition>
        <v-button v-if="store.isShowBackButton" @click="back" :icon="mdiArrowLeft" />
      </Transition>

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
      <div class="flex-grow hidden xl:block">
        <div class="flex justify-end space-x-5">
          <v-button
            v-for="link in NAV_LINKS"
            :key="link.path"
            :color="link.path === '/login' ? 'secondary' : 'transparent'"
            :to="link.path"
          >
            {{ link.name }}
          </v-button>
        </div>
      </div>

      <!-- Drawer Button -->
      <div class="flex-grow justify-end flex xl:hidden">
        <v-button :icon="mdiMenu" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CCSLogo from '~/assets/img/ccs_logo.png';
import CSPSLogo from '~/assets/img/csps_logo.png';
import UCLogo from '~/assets/img/uc_logo.png';

import { useRouter } from 'vue-router';
import { mdiMenu, mdiArrowLeft } from "@mdi/js";
import { Env, NAV_LINKS } from "~/config";
import { useStore } from "~/store";

import VButton from "~/components/VButton.vue";
import { getHistoryLength } from '~/utils/page';

defineProps({
  transparent: {
    type: Boolean,
    default: false
  },
});

const store = useStore();
const router = useRouter();

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
  @apply h-20;
}

h3 {
  @apply text-primary-light-90 text-lg font-bold;
}
</style>
