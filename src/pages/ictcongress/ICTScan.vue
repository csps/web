<template>
  <div class="flex justify-center items-center flex-col gap-5 flex-grow" @click="input?.focus()">
    <h2 class="text-2xl font-medium">ICT Congress 2024 - Attendance RFID Scanner</h2>
    <input v-model="rfid" ref="input" type="password" autocomplete="off" autofocus />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import Swal from "sweetalert2";
import { Endpoints, makeRequest } from '~/network/request';

let timeout: NodeJS.Timeout;
const input = ref<HTMLInputElement | null>(null);
const rfid = ref('');

onMounted(() => {
  input.value?.focus();
});

watch(rfid, v => {
  if (v.length < 5) return;
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    showSwalLoading();

    makeRequest<ICTStudentModel, { rfid: string }>("POST", Endpoints.ICTCongressRFID, {
      rfid: v
    }, response => {
        rfid.value = "";

        Swal.fire({
          timer: 3000,
          showCancelButton: false,
          showConfirmButton: false,
          icon: response.success ? "success" : "error",
          title: response.message,
          text: response.success ? response.data.first_name + " " + response.data.last_name : undefined
        });
    });
  }, 500);
});

/**
 * Show Swal loading
 */
function showSwalLoading(text?: string) {
  Swal.fire({
    title: text ? text : "Please wait...",
    timerProgressBar: true,
    showConfirmButton: false,
    allowOutsideClick: false,
    didOpen() {
      Swal.showLoading();
    }
  });
}
</script>

<style lang="scss" scoped>
input {
  @apply border-none text-on-surface rounded-[999px] px-7 py-5
    focus:border-none outline-none text-center text-lg dark:bg-surface-container-high
    bg-outline-variant;
}
</style>