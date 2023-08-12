<template>
  <md-dialog :open="dialog.show" @close="close">
    <div slot="headline" class="w-full">{{ dialog.title }}</div>
    <div slot="content">{{ dialog.message }}</div>
    <div class="space-x-1" slot="actions">
      <md-text-button @click="dialog.cancel?.click">{{ dialog.cancel?.text }}</md-text-button>
      <md-text-button @click="dialog.ok?.click" v-if="dialog.ok">{{ dialog.ok?.text }}</md-text-button>
    </div>
  </md-dialog>
</template>

<script lang="ts" setup>
import "@material/web/dialog/dialog";
import "@material/web/button/text-button";

import { useDialog } from '~/store/dialog';

const dialog = useDialog();

function close() {
  dialog.hide();
}
</script>