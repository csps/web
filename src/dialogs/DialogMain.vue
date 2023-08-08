<template>
  <md-dialog :open="dialog.show" @close="close">
    <h4 slot="headline" class="w-full">{{ dialog.title }}</h4>
    <p>{{ dialog.message }}</p>
    <div class="space-x-1" slot="footer">
      <md-text-button @click="dialog.cancel?.click">{{ dialog.cancel?.text }}</md-text-button>
      <md-text-button @click="dialog.ok?.click" v-if="dialog.ok">{{ dialog.ok?.text }}</md-text-button>
    </div>
  </md-dialog>
</template>

<script lang="ts" setup>
import "@material/web/dialog/dialog";

import { useDialog } from '~/store/dialog';

const dialog = useDialog();

function close() {
  dialog.hide();
}
</script>