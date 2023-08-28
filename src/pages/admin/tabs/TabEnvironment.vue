<template>
  <div class="px-6">

    <div class="flex justify-center mb-2">
      <md-outlined-text-field label="Search variable">
        <md-icon slot="leadingicon" v-html="icon('search')" />
      </md-outlined-text-field>
    </div>

    <div class="flex flex-col items-center pt-6 gap-3">
      <div v-for="item in Object.entries(Env)" :key="item[0]" @click="onEnvClick(item)" class="item text-on-surface-variant" role="button">
        <md-ripple />
        <div class="flex justify-between gap-6 items-center">
          <div>
            <h3 class="title-medium font-medium mb-1">{{ capitalize(item[0].toString()) }}</h3>
            <p class="body-small">{{ item[1] }}</p>
          </div>
          <md-icon v-html="icon('chevron_right')" />
        </div>
      </div>
    </div>

    <DialogUpdateEnv v-model="isDialogOpen" :name="name" :value="value" />
  </div>  
</template>

<script lang="ts" setup>
import "@material/web/icon/icon";
import "@material/web/textfield/outlined-text-field";

import { ref } from "vue";
import { Env } from "~/config";
import { icon } from "~/utils/icon";
import { capitalize } from "~/utils/string";

import DialogUpdateEnv from "~/components/dialogs/DialogUpdateEnv.vue";

const isDialogOpen = ref(false);
const name = ref("");
const value = ref("");

function onEnvClick(item: [string, string | number]) {
  name.value = item[0];
  value.value = item[1].toString();
  isDialogOpen.value = true;
}
</script>

<style lang="scss" scoped>
.item {
  @apply relative flex flex-col justify-between p-6 rounded-[28px] w-full bg-surface-container;
}
</style>