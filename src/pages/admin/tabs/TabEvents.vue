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

    <div v-if="data.events.length > 0" class="space-y-3 mt-8 w-full lg:w-2/3 xl:w-1/2 2xl:w-2/5">
      <div v-for="(event, i) in data.events" :key="event.id">
        <p class="label-large font-medium text-on-surface-variant mb-3 text-left" v-if="getMonthCategory(data.events, event.date_stamp, i)">
          {{ getMonthCategory(data.events, event.date_stamp, i) }}
        </p>

        <CardEvent :event="event" />
      </div>
    </div>
    <div v-else class="flex justify-center mt-8 flex-grow body-medium">
      {{ message || "Fetching events..." }}
    </div>

    <DialogAdminEvents v-model="isDialogOpen" />
  </div>
</template>

<script lang="ts" setup>
import type { PaginationRequest } from "~/types/request";
import { onMounted, ref, watch } from "vue";
import { icon } from "~/utils/icon";
import { EventEnum } from "~/types/models";
import { capitalize } from "~/utils/string";
import { getMonthCategory } from "~/utils/date";
import { Endpoints, makeRequest } from "~/network/request";
import { useStore } from "~/store";
import { Env } from "~/config";

import CardEvent from "../components/CardEvent.vue";
import DialogAdminEvents from "~/components/dialogs/DialogAdminEvents.vue";

const message = ref();
const isDialogOpen = ref(false);
const isLoading = ref(false);
const store = useStore();

const data = ref({
  total: 0,
  page: 1,
  search: "",
  events: [] as EventModel[],
  column: EventEnum.title
});

watch([
  () => data.value.search,
  () => data.value.column,
  () => data.value.page,
], v => {
  fetchEvents(v[0]);
});

onMounted(fetchEvents);

function fetchEvents(search = "") {
  isLoading.value = true;
  store.isLoading = true;

  const request: PaginationRequest = {
    search_value: [search],
    search_column: [data.value.column],
    page: data.value.page,
    limit: Env.admin_Events_per_page,
    sort_column: EventEnum.date_stamp,
    sort_type: "DESC"
  };

  makeRequest<EventModel[]>("GET", Endpoints.Events, request, response => {
    isLoading.value = false;
    store.isLoading = false;
    data.value.events = [];

    if (response.success) {
      data.value.total = response.count || 0;
      data.value.events = response.data;
      return;
    }

    message.value = response.message;
  });
}
</script>