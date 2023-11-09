<template>
  <div class="flex flex-col text-on-surface-variant items-center gap-5 w-full h-full px-6">
    <div class="grid grid-cols-1 gap-6 justify-center w-full sm:w-3/4 md:w-3/5 lg:w-2/5 2xl:w-1/3 3xl:w-1/4 bg-surface-container-low p-10 rounded-2xl">
      <h3 class="headline-small font-medium mb-1">Profile</h3>
  
      <div class="grid grid-cols-2 gap-5">
        <!-- First name -->
        <md-filled-text-field
          label="First name"
          :value="store.user.first_name"
          readonly
        >
          <md-icon slot="leading-icon" v-html="icon('person', true)" />
        </md-filled-text-field>
    
        <!-- Last name -->
        <md-filled-text-field
          label="Last name"
          :value="store.user.last_name"
          readonly
        >
          <md-icon slot="leading-icon" v-html="icon('person', true)" />
        </md-filled-text-field>
      </div>

      <!-- Student ID -->
      <md-filled-text-field
        label="Student ID"
        :value="store.user.student_id"
        readonly
      >
        <md-icon slot="leading-icon" v-html="icon('badge', true)" />
      </md-filled-text-field>
  
      <!-- Email -->
      <md-filled-text-field
        label="Email"
        :value="store.user.email_address"
        readonly
      >
        <md-icon slot="leading-icon" v-html="icon('mail', true)" />
      </md-filled-text-field>

      <!-- Year level -->
      <md-filled-text-field
        label="Year level"
        :value="mapYear(store.user.year_level)"
        readonly
      >
        <md-icon slot="leading-icon" v-html="icon('school', true)" />
      </md-filled-text-field>

      <!-- Logout -->
      <div class="flex justify-between gap-2">
        <md-text-button @click="isDialogOpen = true">Change password</md-text-button>
        <md-filled-button @click="openLogoutDialog">Logout</md-filled-button>
      </div>
    </div>

    <DialogChangePassword v-model="isDialogOpen" />
  </div>  
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { icon } from '~/utils/icon';
import { useRouter } from 'vue-router';
import { useStore, useDialog } from '~/store';
import Strings from '~/config/strings';

import "@material/web/button/text-button";
import "@material/web/button/filled-button";
import "@material/web/textfield/filled-text-field";

import DialogChangePassword from "~/components/dialogs/DialogChangePassword.vue";
import { mapYear } from "~/utils/page";

const store = useStore();
const dialog = useDialog();
const router = useRouter();

const isDialogOpen = ref(false);

/**
 * Open logout dialog
 */
function openLogoutDialog() {
  dialog.open(Strings.LOGOUT_DIALOG_TITLE, Strings.LOGOUT_DIALOG_MESSAGE, {
    text: "Logout",
    click: () => {
      // Set loading to true
      store.isLoading = true;
      // Remove token cookie
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
</script>
