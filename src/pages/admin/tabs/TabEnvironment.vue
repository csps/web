<template>
  <div class="px-6">

    <div class="flex flex-col items-center justify-center mb-2 gap-3">
      <md-outlined-text-field v-model="search" label="Search variable">
        <md-icon slot="leadingicon" v-html="icon('search')" />
      </md-outlined-text-field>

      <md-filled-button @click="onAddEnvClick">
        <md-icon slot="icon" v-html="icon('add')" />
        Add variable
      </md-filled-button>
    </div>

    <div class="flex flex-col items-center pt-6 gap-3">
      <div v-for="item in list" :key="item[0]" @click="onEnvClick(item)" class="item text-on-surface-variant" role="button">
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

    <DialogAdminEnv v-model="isDialogOpen" :name="name" :value="value" />
  </div>  
</template>

<script lang="ts" setup>
import "@material/web/icon/icon";
import "@material/web/button/filled-button";
import "@material/web/textfield/outlined-text-field";

import { ref, watch } from "vue";
import { Env } from "~/config";
import { icon } from "~/utils/icon";
import { capitalize } from "~/utils/string";

import DialogAdminEnv from "~/components/dialogs/DialogAdminEnv.vue";

const isDialogOpen = ref(false);
const list = ref(Object.entries(Env));
const search = ref("");
const name = ref("");
const value = ref("");

watch(isDialogOpen, v => {
  if (!v) {
    setTimeout(() => {
      name.value = "";
      value.value = "";
    }, 300);
  }
});

watch(search, v => {
  if (v) {
    list.value = Object.entries(Env).filter(
      item => capitalize(item[0]).toLowerCase().includes(v.toLowerCase()) ||
        item[1].toString().toLowerCase().includes(v.toLowerCase())
    );

    return;
  }

  list.value = Object.entries(Env);
});

function onEnvClick(item: [string, string | number]) {
  name.value = item[0];
  value.value = item[1].toString();
  isDialogOpen.value = true;
}

function onAddEnvClick() {
  isDialogOpen.value = true;
}
</script>

<style lang="scss" scoped>
.item {
  @apply relative flex flex-col justify-between p-6 rounded-3xl w-full bg-surface-container;
}
</style>