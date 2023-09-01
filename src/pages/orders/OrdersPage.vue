<template>
  <div class="flex flex-col justify-center items-center w-full h-full text-on-surface-variant">
    <div>
      <h2 class="text-2xl md:text-3xl font-semibold mb-1 text-left">
        My orders
      </h2>
      <h6 class="text-sm">
        To view your orders, please enter your receipt and student ID.
      </h6>

      <div class="flex flex-col gap-6 mt-5">
        <md-outlined-text-field @keydown.enter="submit" v-model.trim="receiptId" label="Receipt ID" prefix-text="CSPS">
          <md-icon slot="leadingicon" v-html="icon('receipt', true)" />
        </md-outlined-text-field>
        <md-outlined-text-field @keydown.enter="submit" v-model.trim="studentId" label="Student ID" type="number">
          <md-icon slot="leadingicon" v-html="icon('badge', true)" />
        </md-outlined-text-field>
  
        <md-filled-button @click="submit" :disabled="receiptId.length === 0 || studentId.length === 0">
          View order
        </md-filled-button>
  
        <p class="body-small text-center">
          Have an account? 
          <router-link :to="{ name: 'Login' }">
            Click here
          </router-link>
  
          to login  and view your orders!
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { icon } from "~/utils/icon";

import "@material/web/icon/icon";
import "@material/web/textfield/outlined-text-field";
import "@material/web/button/filled-button";

const receiptId = ref("");
const studentId = ref("");

function submit() {
  if (receiptId.value.length === 0 || studentId.value.length === 0) return;

}
</script>