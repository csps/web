<template>
  <md-dialog :open="isDialogOpen" @close="close">
    <div slot="headline" class="flex-col items-start gap-1">
      <div>{{ student?.first_name }} {{ student?.last_name }}</div>
      <div class="text-sm text-outline font-medium">
        {{ ict.campuses.find(c => c.id == student?.campus_id)?.campus.toUpperCase() }} {{ student?.student_id }}
      </div>
    </div>
    <form slot="content" ref="form" class="pt-3" @change="(e: any) => selected = Number(e.target.value)">
      <div class="flex flex-col items-start">
        <div v-for="row in data" :key="row.id" class="flex items-center gap-4 mb-1">
          <md-radio
            :id="`sop${row.id}`"
            name="op"
            :value="row.id"
            :disabled="props.disabledOptions?.includes(row.id)"
            :checked="!props.disabledOptions?.includes(row.id)"
          />
          <label :for="`sop${row.id}`" :class="{ 'text-outline': props.disabledOptions?.includes(row.id) }">
            {{ props.disabledOptions?.includes(row.id) ? row.disabledName : row.name }}
          </label>
        </div>
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
import { useIctStore } from "~/store";

const form = ref<HTMLFormElement | null>(null);
const emit = defineEmits(["update:modelValue", "select"]);
const props = defineProps<{
  student?: ICTStudentModel,
  disabledOptions?: number[],
  modelValue: boolean
}>();

const ict = useIctStore();
const selected = ref(0);
const isDialogOpen = computed(() => props.modelValue);

const data = ref([
  { id: 1, name: "Show information" },
  { id: 2, name: "Confirm Payment", disabledName: "Payment already confirmed" },
  { id: 3, name: "Claim for T-shirt", disabledName: "T-shirt already claimed" },
  { id: 4, name: "Delete record", disabledName: "Delete not possible" }
]);

function select() {
  emit("select", selected.value);
  form.value?.reset();
  selected.value = 0;
}

function close() {
  form.value?.reset();
  selected.value = 0;
  emit("update:modelValue", false);
}
</script>

<style lang="scss" scoped>
label {
  @apply text-base py-2;
}
</style>