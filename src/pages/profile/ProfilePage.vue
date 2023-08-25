<template>
  <div class="flex flex-col text-on-surface-variant items-center gap-5 w-full h-full px-6">
    <div class="grid grid-cols-1 gap-6 justify-center w-full sm:w-3/4 md:w-2/3 lg:w-1/2 2xl:w-1/3 3xl:w-1/4 bg-surface-container-low p-10 rounded-2xl">
      <h3 class="headline-small font-medium mb-1">Profile</h3>
  
      <div class="grid grid-cols-2 gap-5">
        <!-- First name -->
        <md-filled-text-field
          label="First name"
          :value="store.student.first_name"
          readonly disabled
        >
          <md-icon slot="leadingicon" v-html="icon('person', true)" />
        </md-filled-text-field>
    
        <!-- Last name -->
        <md-filled-text-field
          label="Last name"
          :value="store.student.last_name"
          readonly disabled
        >
          <md-icon slot="leadingicon" v-html="icon('person', true)" />
        </md-filled-text-field>
      </div>

      <!-- Student ID -->
      <md-filled-text-field
        label="Student ID"
        :value="store.student.student_id"
        readonly disabled
      >
        <md-icon slot="leadingicon" v-html="icon('badge', true)" />
      </md-filled-text-field>
  
      <!-- Email -->
      <md-filled-text-field
        label="Email"
        :value="store.student.email_address"
        readonly disabled
      >
        <md-icon slot="leadingicon" v-html="icon('mail', true)" />
      </md-filled-text-field>

      <!-- Year level -->
      <md-filled-select label="Year level" v-model="year" quick>
        <md-icon slot="leadingicon" v-html="icon('school', true)" />
        <md-select-option :value="1" headline="1st year" />
        <md-select-option :value="2" headline="2nd year" />
        <md-select-option :value="3" headline="3rd year" />
        <md-select-option :value="4" headline="4th year" />
      </md-filled-select>

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
import { ref, watch } from "vue";
import { icon } from '~/utils/icon';
import { useRouter } from 'vue-router';
import { useStore, useDialog } from '~/store';
import { removeLocal } from '~/utils/page';
import { makeRequest, Endpoints } from "~/network/request";
import { StudentEnum } from "~/types/models";
import { toast } from "vue3-toastify";
import Strings from '~/config/strings';

import "@material/web/textfield/filled-text-field";
import "@material/web/button/text-button";
import "@material/web/select/filled-select";
import "@material/web/button/filled-button";
import "@material/web/select/select-option"

import DialogChangePassword from "~/components/dialogs/DialogChangePassword.vue";

const store = useStore();
const dialog = useDialog();
const router = useRouter();

const isDialogOpen = ref(false);
const year = ref(store.student.year_level);

watch(year, v => {
  store.isLoading = true;

  makeRequest("PUT", Endpoints.StudentsKey, {
    key: StudentEnum.year_level,
    value: v
  }, response => {
    store.isLoading = false;

    toast(response.message, {
      type: response.success ? "success" : "error"
    });

    if (response.success) {
      store.student.year_level = v;
    }
  });
});

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