<template>
  <md-dialog :open="isDialogOpen" @close="close">
    <div slot="headline" class="flex-col items-start gap-1">
      <div>Remove confirmation</div>
    </div>
    <form ref="form" slot="content" class="pt-3">
      <p>
        Removing {{ student?.first_name }} {{ student?.last_name }} ({{ student?.student_id }}) will permanently delete the record and cannot be recovered.
      </p>
      <div class="flex items-center gap-3 mt-5 ml-1">
        <md-checkbox class="error" @change="(e: any) => agreed = e.target!.checked" id="ro1" />
        <label for="ro1" class="text-sm">I understand this action cannot be undone.</label>
      </div>
    </form>
    <div class="space-x-1" slot="actions">
      <md-text-button @click="close">Cancel</md-text-button>
      <md-text-button @click="select" :disabled="!agreed" class="error">
        Remove record
      </md-text-button>
    </div>
  </md-dialog>
</template>

<script lang="ts" setup>
import "@material/web/dialog/dialog";
import "@material/web/button/text-button";
import "@material/web/checkbox/checkbox";
import "@material/web/icon/icon";

import { ref, computed } from "vue";

const agreed = ref(false);
const form = ref<HTMLFormElement | null>(null);
const emit = defineEmits(["update:modelValue", "proceed"]);
const props = defineProps<{
  student?: ICTStudentModel,
  modelValue: boolean
}>();

const isDialogOpen = computed(() => props.modelValue);

function select() {
  form.value?.reset();
  agreed.value = false;
  emit("proceed", props.student);
}

function close() {
  agreed.value = false;
  form.value?.reset();
  emit("update:modelValue", false);
}
</script>

<style lang="scss" scoped>
md-text-button.error {
  --md-sys-color-primary: var(--md-sys-color-error);
}
</style>