<template>
  <div class="flex flex-col justify-center items-center w-full px-6 container mx-auto h-full">
    <md-filled-button @click="isDialogOpen = true" class="mb-5">
      <md-icon slot="icon" v-html="icon('add')" />
      Add event
    </md-filled-button>

    <div class="flex items-center gap-3">
      <md-outlined-text-field
        v-model="data.search"
        :label="'Search ' + capitalize(data.column)"
      >
        <md-icon slot="leadingicon" v-html="icon('search')" />
      </md-outlined-text-field>
      <md-outlined-select v-model="data.column" label="Filter by" class="dense" quick>
        <md-icon slot="leadingicon" v-html="icon('filter_list', true)" />
        <md-select-option
          v-for="option in EventEnum"
          :key="option"
          :value="option"
          :headline="capitalize(option)"
        />
      </md-outlined-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { EventEnum } from "~/types/models";
import { icon } from "~/utils/icon";
import { capitalize } from "~/utils/string";

const isDialogOpen = ref(false);

const data = ref({
  total: 0,
  page: 1,
  search: "",
  events: [] as EventModel[],
  column: EventEnum.title
});
</script>