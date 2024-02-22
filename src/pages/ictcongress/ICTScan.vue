<template>
  <div class="flex justify-center items-center flex-col gap-5 flex-grow" @click="input?.focus()">
    <h2 class="text-2xl font-medium">ICT Congress 2024 - Attendance RFID Scanner</h2>
    <input v-model="rfid" ref="input" type="password" autocomplete="off" autofocus />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { Endpoints, makeRequest } from '~/network/request';
import effectRizz from "~/assets/effects/effect_rizz.mp3";
import effectHuh from "~/assets/effects/effect_huh.mp3";
import Swal from "sweetalert2";

let timeout: NodeJS.Timeout;
const input = ref<HTMLInputElement | null>(null);
const rfid = ref('');

const success = new Audio(effectRizz);
const error = new Audio(effectHuh);

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

        if (response.success) {
          success.play();
        } else {
          error.play();
        }

        Swal.fire({
          timer: 3000,
          showCancelButton: false,
          showConfirmButton: false,
          icon: response.success ? "success" : "error",
          title: response.message,
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