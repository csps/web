<template>
  <div class="h-16 z-[1]">
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
      <h3
        class="block xl:hidden text-on-surface-variant"
        :class="{
          'hidden': route.name === 'RFID Scanner - ICT Congress 2024',
          'hidden md:inline': route.name === 'Admin - ICT Congress 2024'
        }"
      >
        UC Main CSP-S
      </h3>

      <!-- Navigation Links -->
      <div class="flex items-center gap-5 flex-grow justify-end">
        <div class="xl:flex justify-end space-x-2 hidden" v-if="!route.name?.toString().includes('ICT') && !route.name?.toString().includes('Tatak')">
          <md-tabs :activeTabIndex="NAV_LINKS.findIndex(t => t.name === route.name)" class="overflow-hidden">
            <md-primary-tab
              v-for="(link, i) in NAV_LINKS.slice(0, 4)"
              :key="link.path"
              tabindex="-1"
              @click="router.push({ path: link.path })"
              :title="link.name"
            >
              <router-link class="link" :to="link.path">
                <md-icon v-html="icon(link.icon, NAV_LINKS.findIndex(t => t.name === route.name) !== i)" />
                <span>{{ link.name }}</span>
              </router-link>
            </md-primary-tab>

            <md-primary-tab title="Profile" v-show="store.isLoggedIn">
              <router-link class="link" to="/profile" tabindex="-1">
                <md-icon v-html="icon('person')" />
                <span>Profile</span>
              </router-link>
            </md-primary-tab>
            <md-primary-tab title="Login" v-show="!store.isLoggedIn && !store.isAdminLoggedIn">
              <router-link class="link" to="/login" tabindex="-1">
                <md-icon v-html="icon('login')" />
                <span>Login</span>
              </router-link>
            </md-primary-tab>
            <md-primary-tab title="Admin" v-show="store.isAdminLoggedIn">
              <router-link class="link" to="/admin" tabindex="-1">
                <md-icon v-html="icon('account_circle')" />
                <span>Admin</span>
              </router-link>
            </md-primary-tab>
          </md-tabs>
        </div>

        <div v-if="route.name === 'Admin - ICT Congress 2024' || route.name === 'RFID Scanner - ICT Congress 2024'">
          <md-tabs :activeTabIndex="route.name === 'Admin - ICT Congress 2024' ? 0 : 1">
            <md-primary-tab title="Home">
              <router-link class="link" to="/ictcongress2024/admin">
                <md-icon v-html="icon('home')" />
                <span>Home</span>
              </router-link>
            </md-primary-tab>
            <md-primary-tab title="ICT Congress 2024">
              <router-link class="link" to="/ictcongress2024/admin/scan">
                <md-icon v-html="icon('barcode_scanner')" />
                <span>RFID</span>
              </router-link>
            </md-primary-tab>
          </md-tabs>
        </div>

        <div v-if="route.name?.toString().includes('Tatak')">

        <div class="xl:flex justify-end space-x-2 hidden" v-if="route.name === 'Tatak Forms Home' || route.name === 'Tatak Forms Event'">
          <md-tabs class="overflow-hidden" :activeTabIndex="route.name === 'Tatak Forms Home' || route.name === 'Tatak Forms Event' ? 0 : 1">
            <md-primary-tab title="Home">
              <router-link class="link" to="/tatakforms/home">
                <md-icon v-html="icon('home')" />
                <span>Home</span>
              </router-link>
            </md-primary-tab>
            <md-primary-tab title="Profile">
              <router-link class="link" to="">
                <md-icon v-html="icon('person')" />
                <span>Profile</span>
              </router-link>
            </md-primary-tab>
          </md-tabs>
        </div>
        
          
        </div>
            

        <md-switch @change="onThemeChange" :selected="store.isDark" icons>
          <md-icon slot="on-icon" class="scale-[0.65]" v-html="icon('dark_mode')" />
          <md-icon slot="off-icon" class="scale-[0.65]" v-html="icon('light_mode')" />
        </md-switch>

        <md-icon-button title="Logout" @click="logout" v-if="route.path.includes('/ictcongress2024/admin') && !route.path.includes('login')">
          <md-icon v-html="icon('logout')" />
        </md-icon-button>

        <md-icon-button title="Logout" @click="logoutUniv" v-if="route.path.includes('/tatakforms') && !route.path.includes('login') && !route.path.includes('register')">
            <md-icon v-html="icon('logout')" />
        </md-icon-button>

        <!-- Drawer Button -->
        <div class="flex justify-end xl:hidden relative" v-if="!route.name?.toString().includes('ICT') && !route.name?.toString().includes('Tatak')">
          <md-icon-button id="appbar-menu" @click="isMenuOpen = !isMenuOpen">
            <md-icon v-html="icon('menu')" />
          </md-icon-button>

          <md-menu
            :open="isMenuOpen"
            anchor="appbar-menu"
            @closed="isMenuOpen = false"
            class="min-w-min"
            y-offset="8"
            anchor-corner="end-end"
            menu-corner="start-end"
            v-if="!route.name?.toString().includes('Tatak')"
          >
            <router-link
              v-for="link in NAV_LINKS.slice(0, 4)"
              :key="link.path"
              :to="link.path"
            >
              <md-menu-item>
                <span slot="headline">{{ link.name }}</span>
              </md-menu-item>
            </router-link>
            <router-link v-if="store.isLoggedIn" to="/profile" tabindex="-1">
              <md-menu-item>
                <span slot="headline">Profile</span>
              </md-menu-item>
            </router-link>
            <router-link v-else-if="!store.isAdminLoggedIn" to="/login" tabindex="-1">
              <md-menu-item>
                <span slot="headline">Login</span>
              </md-menu-item>
            </router-link>
            <router-link v-if="store.isAdminLoggedIn" to="/admin" tabindex="-1">
              <md-menu-item>
                <span slot="headline">Admin</span>
              </md-menu-item>
            </router-link>
          </md-menu>

          <md-menu
            :open="isMenuOpen"
            anchor="appbar-menu"
            @closed="isMenuOpen = false"
            class="min-w-min"
            y-offset="8"
            anchor-corner="end-end"
            menu-corner="start-end"
            v-else
          >
            <router-link
            v-if="store.isUnivStudentLoggedIn" to="/tatakforms/home" tabindex="-1"
            >
              <md-menu-item>
                <span slot="headline">Home</span>
              </md-menu-item>
            </router-link>
            <router-link v-if="store.isUnivStudentLoggedIn" to="/profile" tabindex="-1">
              <md-menu-item>
                <span slot="headline">Profile</span>
              </md-menu-item>
            </router-link>
          </md-menu>


        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CCSLogo from '~/assets/img/ccs_logo.png';
import CSPSLogo from '~/assets/img/csps_logo.png';
import UCLogo from '~/assets/img/uc_logo.png';

import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Config, NAV_LINKS } from "~/config";
import { useStore, useDialog } from "~/store";
import { getHistoryLength } from '~/utils/page';
import { setDarkMode } from '~/utils/theme';
import { getStore, removeStore } from '~/utils/storage';
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
const dialog = useDialog();
const isMenuOpen = ref(false);

function logout() {
  const id = dialog.open({
    title: "Logout confirmation",
    message: "This will clear your session data. Are you sure you want to logout?",
    ok: {
      text: "Logout",
      click() {
        removeStore("iat");
        removeStore("irt");
        dialog.close(id);
        router.push({ path: "admin/login" });
      }
    },
    cancel:{
      text: "Cancel",
      click() {
        dialog.close(id);
      }
    }
  });
}

function logoutUniv() {
  const id = dialog.open({
    title: "Logout confirmation",
    message: "This will clear your session data. Are you sure you want to logout?",
    ok: {
      text: "Logout",
      click() {
        removeStore("usat");
        removeStore("usrt");
        dialog.close(id);
        router.push({ path: "/tatakforms/login" });
      }
    },
    cancel:{
      text: "Cancel",
      click() {
        dialog.close(id);
      }
    }
  });
}

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

h3 {
  @apply text-base font-medium;
}

md-text-button {
  --md-sys-color-primary: var(--md-sys-color-on-surface-variant);
}

md-primary-tab span {
  @apply text-sm pl-3;
}

md-tabs {
  --md-primary-tab-container-color: transparent;
  --md-primary-tab-container-shape: 8px;

  &::part(divider) {
    @apply hidden;
  }
}

.link {
  @apply h-full flex items-center w-min;
}
</style>

