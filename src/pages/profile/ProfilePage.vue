<template>
  <div class="flex flex-col text-on-surface-variant items-center gap-5 w-full h-full px-6">
    <div class="grid grid-cols-1 gap-5 justify-center w-full sm:w-3/4 md:w-2/3 lg:w-1/2 2xl:w-1/3 3xl:w-1/4">
      <h3 class="title-large font-medium text-center py-4">Profile</h3>
      <!-- Student ID -->
      <md-outlined-text-field
        label="Student ID"
        :value="store.student.student_id"
        supporting-text="Your student ID is used to identify you in the system."
        readonly disabled
      >
        <md-icon slot="leadingicon" v-html="icon('badge', true)" />
      </md-outlined-text-field>
  
      <div class="grid grid-cols-2 gap-5">
        <!-- First name -->
        <md-outlined-text-field
          label="First name"
          :value="store.student.first_name"
          readonly disabled
        >
          <md-icon slot="leadingicon" v-html="icon('account_circle', true)" />
        </md-outlined-text-field>
    
        <!-- Last name -->
        <md-outlined-text-field
          label="Last name"
          :value="store.student.last_name"
          readonly disabled
        >
          <md-icon slot="leadingicon" v-html="icon('account_circle', true)" />
        </md-outlined-text-field>
      </div>
  
      <!-- Email -->
      <md-outlined-text-field
        label="Email"
        :value="store.student.email_address"
        readonly disabled
      >
        <md-icon slot="leadingicon" v-html="icon('mail', true)" />
      </md-outlined-text-field>
  
      <!-- Year level -->
      <md-outlined-select label="Year level" v-model="year" quick>
        <md-icon slot="leadingicon" v-html="icon('school', true)" />
        <md-select-option :value="1" headline="1st year" />
        <md-select-option :value="2" headline="2nd year" />
        <md-select-option :value="3" headline="3rd year" />
        <md-select-option :value="4" headline="4th year" />
      </md-outlined-select>

      <!-- Logout -->
      <div class="flex justify-end gap-2">
        <md-filled-button @click="openLogoutDialog">Logout</md-filled-button>
        <md-text-button>Change password</md-text-button>
      </div>
    </div>
  </div>  
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { icon } from '~/utils/icon';
import { useRouter } from 'vue-router';
import { useStore, useDialog } from '~/store';
import { removeLocal } from '~/utils/page';
import Strings from '~/config/strings';

import "@material/web/textfield/outlined-text-field";
import "@material/web/button/text-button";
import "@material/web/select/outlined-select";
import "@material/web/button/filled-button";
import "@material/web/select/select-option"

const store = useStore();
const dialog = useDialog();
const router = useRouter();
const year = ref(store.student.year_level);

/**
 * Open logout dialog
 */
function openLogoutDialog() {
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
</script>
