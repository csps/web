<template>
    <md-dialog :open="isDialogOpen" @close="close">
      <div slot="headline" class="flex-col items-start gap-1">
        <div>Scan RFID</div>
        <div class="text-sm text-outline font-medium">
          For {{ student?.first_name }} {{ student?.last_name }} ({{ student?.student_id }})
        </div>
      </div>
      <form slot="content" class="pt-3">
        <md-filled-text-field v-model.trim="rfid" label="RFID" autofocus>
          <md-icon slot="leading-icon" v-html="icon('badge', true)" />
        </md-filled-text-field>
      </form>
      <div class="space-x-1" slot="actions">
        <md-text-button @click="close">Back</md-text-button>
        <md-text-button @click="proceed" autofocus>
          Proceed
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
import { icon } from "~/utils/icon";
import { toast } from "vue3-toastify";
  
  const emit = defineEmits(["update:modelValue", "proceed"]);
  const props = defineProps<{
    student?: ICTStudentModel,
    modelValue: boolean
  }>();
  
  const rfid = ref("");
  const isDialogOpen = computed(() => props.modelValue);
  
  function proceed() {
    if (rfid.value.length === 0) {
      toast.error("RFID is required.");
      return;
    }

    emit("proceed", rfid.value);
    rfid.value = "";
  }
  
  function close() {
    rfid.value = "";
    emit("update:modelValue", false);
  }
  </script>
  
  <style lang="scss" scoped>
  label {
    @apply text-base py-2;
  }
  </style>