<template>
  <div class="px-6 w-full xl md:w-3/4">

    <div class="flex justify-between items-center gap-3 mb-5">
      <div class="flex items-center gap-3 text-2xl font-medium text-on-surface-variant">
        <h2>Variables</h2>
        <md-assist-chip label="Add" aria-label="Add environment variables" title="Add environment variables" @click="isDialogOpen = true">
          <md-icon slot="icon" v-html="icon('add')" />
        </md-assist-chip>
      </div>

      <md-outlined-text-field
        v-model="search"
        label="Search variable"
      />
    </div>

    <div class="mt-5">
      <VTable
        :headers="headers"
        :data="list.map(v => {
          return {
            key: capitalize(v[0]),
            value: v[1].toString(),
          };
        })"

        @edit="onEnvClick"
        no-delete
      />
    </div>

    <DialogAdminEnv v-model="isDialogOpen" :name="name" :value="value" @done="onDone" />
  </div>
</template>

<script lang="ts" setup>
import "@material/web/icon/icon";
import "@material/web/chips/assist-chip";
import "@material/web/button/filled-button";
import "@material/web/textfield/outlined-text-field";

import { ref, watch } from "vue";
import { Env } from "~/config";
import { icon } from "~/utils/icon";
import { capitalize } from "~/utils/string";

import VTable from "~/components/VTable.vue";
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

const headers: TableHeader[] = [
  { id: "key", text: "Key" },
  { id: "value", text: "Value" },
];

function onEnvClick(item: { key: string, value: string }) {
  name.value = item.key;
  value.value = item.value;
  isDialogOpen.value = true;
}

function onDone() {
  list.value = Object.entries(Env);
}
</script>

<style lang="scss" scoped>
.item {
  @apply relative flex flex-col justify-between p-6 min-w-[200px] rounded-3xl w-full bg-surface-container;
}
</style>