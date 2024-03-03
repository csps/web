<template>
  <md-dialog @cancel="cancel" :open="data.show" @close="close" class="max-w-[500px]" type="alert">
    <div slot="headline" class="w-full">{{ data.title }}</div>
    <div slot="content" class="pt-2.5" v-html="data.message" />
    <div class="space-x-1" slot="actions">
      <md-text-button v-if="data.cancel" @click="data.cancel.click">{{ data.cancel.text }}</md-text-button>
      <md-text-button :class="{ 'error': data.ok.error }" @click="data.ok?.click" v-if="data.ok">{{ data.ok?.text }}</md-text-button>
    </div>
  </md-dialog>
</template>

<script lang="ts" setup>
import "@material/web/dialog/dialog";
import "@material/web/button/text-button";

const emit = defineEmits(["close"]);
const props = defineProps<{
  data: DialogQueueItem
}>();

function cancel(e: Event) {
  if (!props.data.dismissible) {
    e.preventDefault();
  }
}

function close() {
  emit("close");
}
</script>

<style lang="scss" scoped>
.error {
  --md-sys-color-primary: var(--md-sys-color-error);
}
</style>