<template>
  <div class="flex justify-center container mx-auto px-6">
    <div v-for="item in items" :key="item.name" @click="item.onClick" class="item text-on-surface-variant" role="button">
      <md-ripple />
      <div class="flex justify-between">
        <h3 class="title-medium font-medium">Logout</h3>
        <md-icon v-html="icon('chevron_right')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { icon } from "~/utils/icon";
import { useDialog, useStore } from "~/store";
import { removeStore } from "~/utils/storage";
import { useRouter } from "vue-router";

import "@material/web/ripple/ripple";
import Strings from "~/config/strings";

const store = useStore();
const dialog = useDialog();
const router = useRouter();

type Item = {
  name: string;
  onClick: () => void;
};

const items: Item[] = [
  { 
    name: "Logout",
    onClick() {
      dialog.open(Strings.LOGOUT_DIALOG_TITLE, Strings.LOGOUT_DIALOG_MESSAGE, {
        text: "Logout",
        click: () => {
          // Set loading to true
          store.isLoading = true;
          // Clear local storage
          removeStore("adm_token");
          // Set logged out
          store.isAdminLoggedIn = false;
          // Redirect to login
          router.push({ name: "Admin Login" });
          // Set loading to false
          store.isLoading = false;
          // Close dialog
          dialog.hide();
        }
      });
    }
  }
];
</script>

<style lang="scss" scoped>
.item {
  @apply relative flex flex-col justify-between p-6 rounded-3xl w-full bg-surface-container md:w-2/3 xl:w-1/2;;
}
</style>