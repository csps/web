<template>
  <md-dialog :open="isDialogOpen" @close="close">
    <div slot="headline" class="flex-col items-start gap-1">
      <div>Campus Options</div>
      <div class="text-sm text-outline font-medium">
        Select an option for {{ campus?.campus_name }}
      </div>
    </div>
    <form slot="content" class="pt-3" @change="(e: any) => selected = Number(e.target.value)" ref="form">
      <div v-for="option in options" :key="option.id" class="flex items-center gap-4">
        <md-radio :id="`op${option.id}`" name="option" :value="option.id" />
        <label :for="`op${option.id}`">{{ option.name }}</label>
      </div>
    </form>
    <div class="space-x-1" slot="actions">
      <md-text-button @click="close">Cancel</md-text-button>
      <md-text-button @click="select" :disabled="selected <= 0" autofocus>
        Select
      </md-text-button>
    </div>
  </md-dialog>
</template>

<script lang="ts" setup>
import "@material/web/dialog/dialog";
import "@material/web/textfield/filled-text-field";
import "@material/web/radio/radio";
import "@material/web/icon/icon";

import { ref, computed } from "vue";

const emit = defineEmits(["update:modelValue", "select"]);
const props = defineProps<{
  campus?: ICTCampus,
  modelValue: boolean
}>();

const form = ref<HTMLFormElement | null>(null);
const selected = ref(0);
const isDialogOpen = computed(() => props.modelValue);
const options = [
  { id: 1, name: "Export to Excel" },
  { id: 2, name: "Export to CSV" },
  { id: 3, name: "Delete Pending Orders" }
];

function select() {
  emit("select", selected.value);
}

function close() {
  selected.value = 0;
  form.value?.reset();
  emit("update:modelValue", false);
}
</script>

<style lang="scss" scoped>
label {
  @apply text-base py-2;
}
</style>