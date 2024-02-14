<template>
  <md-dialog :open="isDialogOpen" @close="close">
    <div slot="headline" class="flex-col items-start gap-1">
      <div>{{ student?.first_name }} {{ student?.last_name }}</div>
      <div class="text-sm text-outline font-medium">
        {{ ict.campuses.find(c => c.id == student?.campus_id)?.campus.toUpperCase() }} {{ student?.student_id }}
      </div>
    </div>
    <form slot="content" class="pt-3" @change="(e: any) => selected = Number(e.target.value)">
      <div class="flex items-center gap-4">
        <md-radio
          id="sop1"
          name="op"
          value="1"
          :disabled="disabledOptions?.includes(1)"
          :checked="!disabledOptions?.includes(1)"
        />
        <label for="sop1" :class="{ 'text-outline': disabledOptions?.includes(1) }">
          Show information
        </label>
      </div>
      <div class="flex items-center gap-4 mb-1">
        <md-radio
          id="sop2"
          name="op"
          value="2"
          :disabled="disabledOptions?.includes(2)"
          :checked="!disabledOptions?.includes(2)"
        />
        <label for="sop2" :class="{ 'text-outline': disabledOptions?.includes(2) }">
          Confirm payment
        </label>
      </div>
    </form>
    <div class="space-x-1" slot="actions">
      <md-text-button @click="close">Cancel</md-text-button>
      <md-text-button @click="select" autofocus>
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

const emit = defineEmits(["update:modelValue", "select"]);
const props = defineProps<{
  student?: ICTStudentModel,
  disabledOptions?: number[],
  modelValue: boolean
}>();

const ict = useIctStore();
const selected = ref(1);
const isDialogOpen = computed(() => props.modelValue);

function select() {
  emit("select", selected.value);
}

function close() {
  emit("update:modelValue", false);
}
</script>

<style lang="scss" scoped>
label {
  @apply text-base py-2;
}
</style>