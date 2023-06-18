<template>
  <div class="appbar" :class="[ transparent ? 'bg-transparent' : 'bg-primary' ]">
    <div class="container mx-auto px-4 flex items-center space-x-5 h-full">

      <!-- Drawer Button -->
      <v-button class="block xl:hidden" :icon="mdiMenu" />
      
      <!-- Logos -->
      <div class="logos">
        <img :src="CCSLogo" alt="CCS Logo" />
        <img :src="CSPSLogo" alt="CSPS Logo" />
        <img :src="UCLogo" alt="UC Logo" />
      </div>

      <!-- Title -->
      <h3 class="hidden lg:block">UC Main Computing Society of the Philippines - Students</h3>
      <h3 class="block lg:hidden">UC Main CSP-S</h3>

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

    </div>
  </div>
</template>

<script lang="ts" setup>
import CCSLogo from '~/assets/img/ccs_logo.png';
import CSPSLogo from '~/assets/img/csps_logo.png';
import UCLogo from '~/assets/img/uc_logo.png';

import { mdiMenu } from "@mdi/js";
import { NAV_LINKS } from "~/config";

import VButton from "~/components/VButton.vue";

defineProps({
  transparent: {
    type: Boolean,
    default: false
  },
})
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
