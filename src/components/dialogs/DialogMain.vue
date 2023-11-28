<template>
  <md-dialog :open="data.show" @close="close">
    <div slot="headline" class="w-full">{{ data.title }}</div>
    <div slot="content">
      {{ data.message }}
    </div>
    <div class="space-x-1" slot="actions">
      <md-text-button v-if="data.cancel" @click="data.cancel.click">{{ data.cancel.text }}</md-text-button>
      <md-text-button @click="data.ok?.click" v-if="data.ok">{{ data.ok?.text }}</md-text-button>
    </div>
  </md-dialog>
</template>

<script lang="ts" setup>
import "@material/web/dialog/dialog";
import "@material/web/button/text-button";

defineProps<{
  data: DialogQueueItem
}>();

const emit = defineEmits(["close"]);

function close() {
  emit("close");
}
</script>