<template>
  <md-dialog :open="isDialogOpen" @close="close" class="h-[300px]">
    <div slot="headline" class="flex-col items-start gap-1">
      <div>Remove pending orders?</div>
    </div>
    <form ref="form" slot="content" class="pt-5">
      <p>
        This is a destructive action.
        This will remove all {{ store.ictAdmin.campus_name }} students with <span class="font-medium">pending payments</span> from the database.
        Deleted data can not be recovered.
      </p>
      <div class="mt-5 text-sm">
        There are currently <span class="text-error font-medium">{{ pendingCount }}</span> pending order(s).
      </div>
      <div class="flex items-center gap-3 mt-5 ml-1">
        <md-checkbox class="error" @change="(e: any) => agreed = e.target!.checked" id="ro1" />
        <label for="ro1" class="text-sm">I understand this action cannot be undone.</label>
      </div>
    </form>
    <div class="space-x-1" slot="actions">
      <md-text-button @click="close">Cancel</md-text-button>
      <md-text-button @click="select" :disabled="!agreed" class="error">
        Remove Pending Orders
      </md-text-button>
    </div>
  </md-dialog>
</template>

<script lang="ts" setup>
import "@material/web/dialog/dialog";
import "@material/web/button/text-button";
import "@material/web/checkbox/checkbox";
import "@material/web/icon/icon";

import { ref, computed, watch } from "vue";
import { useStore } from "~/store";
import { Endpoints, makeRequest } from "~/network/request";
import { toast } from "vue3-toastify";

const agreed = ref(false);
const store = useStore();
const pendingCount = ref(0);
const form = ref<HTMLFormElement | null>(null);
const emit = defineEmits(["update:modelValue", "proceed"]);
const props = defineProps<{
  modelValue: boolean
}>();

const isDialogOpen = computed(() => props.modelValue);

watch(() => props.modelValue, v => {
  if (v) {
    pendingCount.value = 0;

    makeRequest("GET", Endpoints.ICTCongressPendingOrders, null, response => {
      store.isLoading = false;

      if (response.success) {
        pendingCount.value = response.message;
        return;
      }

      toast.error(response.message);
    });
  }
});

function select() {
  form.value?.reset();
  agreed.value = false;
  emit("proceed");
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