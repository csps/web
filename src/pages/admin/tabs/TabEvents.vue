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
        <md-icon slot="leading-icon" v-html="icon('search')" />
      </md-outlined-text-field>
      <md-outlined-select v-model="data.column" label="Filter by" class="dense">
        <md-icon slot="leading-icon" v-html="icon('filter_list', true)" />
        <md-select-option
          v-for="option in EventEnum"
          :key="option"
          :value="option"
        >
          <span slot="headline">{{ capitalize(option) }}</span>
        </md-select-option>
      </md-outlined-select>
    </div>

    <div v-if="data.events.length > 0" class="w-full md:w-3/4 2xl:w-2/3 3xl:w-1/2 mt-8 grid grid-cols-1 lg:grid-cols-2 gap-3">
      <div v-for="event in data.events" :key="event.id" class="flex flex-col justify-end">
        <CardEvent class="h-full" :event="event" />
      </div>
    </div>

    <div v-else class="flex justify-center mt-8 flex-grow body-medium">
      {{ message || "Fetching events..." }}
    </div>

    <VPagination
      class="mt-5"
      v-if="data.events.length > 0"
      :limit="parseInt(Env.admin_events_per_page)"
      :page="data.page"
      :total="data.total"
      @change="p => data.page = p"
    />

    <DialogAdminEvents v-model="isDialogOpen" @done="fetchEvents" />
  </div>
</template>

<script lang="ts" setup>
import type { PaginationRequest } from "~/types/request";
import { onMounted, ref, watch } from "vue";
import { icon } from "~/utils/icon";
import { EventEnum } from "~/types/models";
import { capitalize } from "~/utils/string";
import { Endpoints, makeRequest } from "~/network/request";
import { getStore, setStore } from "~/utils/storage";
import { useStore } from "~/store";
import { Env } from "~/config";

import CardEvent from "../components/CardEvent.vue";
import VPagination from "~/components/VPagination.vue";
import DialogAdminEvents from "~/components/dialogs/DialogAdminEvents.vue";

const message = ref();
const isDialogOpen = ref(false);
const isLoading = ref(false);
const store = useStore();

const data = ref({
  total: 0,
  page: getStore("tabs_events_page") ? parseInt(getStore("tabs_events_page")) : 1,
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
    limit: Env.admin_events_per_page,
    sort_column: EventEnum.date,
    sort_type: "DESC"
  };

  makeRequest<EventModel[]>("GET", Endpoints.Events, request, response => {
    isLoading.value = false;
    store.isLoading = false;
    data.value.events = [];

    if (response.success) {
      data.value.total = response.count || 0;
      data.value.events = response.data;
      setStore("tabs_events_page", `${request.page}`);
      return;
    }

    message.value = response.message;
  });
}
</script>