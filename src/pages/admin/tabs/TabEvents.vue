<template>
  <div class="flex flex-col justify-center items-center w-full px-6 container mx-auto h-full">
    <div class="flex items-center gap-3">
      <md-outlined-text-field
        v-model="data.search"
        :label="'Search ' + capitalize(data.column)"
      >
        <md-icon slot="leading-icon" v-html="icon('search')" />

        <div slot="trailing-icon">
          <div class="relative">
            <md-icon-button id="events-sort-menu" class="mr-2" title="Filter by" @click.stop="isMenuOpen = !isMenuOpen">
              <md-icon v-html="icon('filter_list')" />
            </md-icon-button>
            <md-menu
              :open="isMenuOpen"
              anchor="events-sort-menu"
              @closed="isMenuOpen = false"
              class="min-w-min"
              y-offset="8"
              anchor-corner="end-end"
              menu-corner="start-end"
            >
              <md-menu-item
                v-for="option in EventEnum"
                :key="option"
                :value="option"
                @click="data.column = option"
              >
                <span class="whitespace-nowrap">{{ capitalize(option) }}</span>
              </md-menu-item>
            </md-menu>
          </div>

          <md-icon-button class="mr-2" title="Add student" @click="isDialogOpen = true">
            <md-icon v-html="icon('add')" />
          </md-icon-button>
        </div>
      </md-outlined-text-field>
    </div>

    <div v-if="data.events.length > 0" class="w-full 2xl:w-2/3 3xl:w-3/5 mt-8 grid grid-cols-1 lg:grid-cols-2 gap-3">
      <div v-for="event in data.events" :key="event.id">
        <CardEvent class="h-full" :event="event" @click="onEdit(event)" />
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

    <DialogAdminEvents
      v-model="isDialogOpen"
      :event="event"
      @done="fetchEvents"
    />
  </div>
</template>

<script lang="ts" setup>
import type { PaginationRequest } from "~/types/request";
import { onMounted, ref, watch } from "vue";
import { icon } from "~/utils/icon";
import { EventEnum } from "~/types/models";
import { capitalize } from "~/utils/string";
import { Endpoints, makeRequest } from "~/network/request";
import { createPagination } from "~/utils/pagination";
import { getStore, setStore } from "~/utils/storage";
import { useStore } from "~/store";
import { Env } from "~/config";

import CardEvent from "../components/CardEvent.vue";
import VPagination from "~/components/VPagination.vue";
import DialogAdminEvents from "~/components/dialogs/DialogAdminEvents.vue";

const message = ref();
const isDialogOpen = ref(false);
const isLoading = ref(false);
const isMenuOpen = ref(false);
const event = ref<EventModel>();
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

watch(isDialogOpen, v => {
  if (!v) {
    event.value = undefined;
  }
});

onMounted(fetchEvents);

function fetchEvents(search = "") {
  isLoading.value = true;
  store.isLoading = true;

  const request = createPagination({
    limit: Number(Env.admin_events_per_page),
    page: data.value.page,
    search: {
      key: [data.value.column],
      value: [search]
    },
    sort: {
      key: EventEnum.date,
      type: "DESC"
    }
  });

  makeRequest<EventModel[], PaginationRequest>("GET", Endpoints.Events, request, response => {
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

function onEdit(data: EventModel) {
  event.value = data;
  isDialogOpen.value = true;
}
</script>