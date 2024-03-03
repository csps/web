<template>
  <div class="container mx-auto px-4">
    <div class="flex justify-between items-center flex-col lg:flex-row gap-3 mb-3">
      <div class="flex items-center gap-3 text-2xl font-medium text-on-surface-variant mb-3 lg:mb-0">
        <h2>Events</h2>
        <md-assist-chip label="Add" aria-label="Add event" title="Add event" @click="isDialogOpen = true">
          <md-icon slot="icon" v-html="icon('add')" />
        </md-assist-chip>
      </div>

      <div class="flex items-center gap-3 relative bottom-2">
        <md-filled-text-field  @keyup.enter="fetchEvents(data.search)" v-model="data.search" :label="capitalize(data.column)">
          <md-icon slot="leading-icon" v-html="icon('search')" />
          <div slot="trailing-icon">
            <div class="relative">
              <md-icon-button id="orders-sort-menu" class="mr-2" title="Filter by" @click.stop="isMenuOpen = !isMenuOpen">
                <md-icon v-html="icon('filter_list')" />
              </md-icon-button>
              <md-menu
                :open="isMenuOpen"
                anchor="orders-sort-menu"
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
          </div>
        </md-filled-text-field>
        <md-filled-button @click="fetchEvents(data.search)" :disabled="isLoading">
          Search
        </md-filled-button>
      </div>
    </div>

    <div>
      <VTable
        :loading="isLoading"
        :headers="headers"
        :data="data.events"
        @edit="onEdit"
        @delete="onDelete"
        hoverable
      >
        <template v-slot:description="{ row }: { row: EventModel }">
          <span v-if="row.description === ''" class="italic font text-on-surface-variant">(no description)</span>
          <span v-else>{{ row.description }}</span>
        </template>

        <template v-slot:date="{ row }: { row: EventModel }">
          {{ getHumanDate(new Date(row.date)) }}
        </template>
      </VTable>

      <div v-if="message.length > 0 && data.events.length === 0" class="flex justify-center py-4 text-error font-medium">
        {{ message }}
      </div>

      <VPagination
        class="mt-5"
        v-if="data.events.length > 0"
        :limit="parseInt(Env.admin_events_per_page)"
        :page="data.page"
        :total="data.total"
        @change="p => goToPage(p)"
      />
    </div>

    <DialogAdminEvents
      v-model="isDialogOpen"
      :event="event"
      @done="fetchEvents"
    />
  </div>
</template>

<script lang="ts" setup>
import { toast } from 'vue3-toastify';
import { onMounted, ref, watch } from 'vue';
import { useStore, useDialog } from '~/store';
import { EventEnum } from '~/types/models';
import { icon } from '~/utils/icon';
import { getStore, setStore } from '~/utils/storage';
import { capitalize } from '~/utils/string';
import { Endpoints, makeRequest } from '~/network/request';
import { PaginationRequest } from '~/types/request';
import { createPagination } from '~/utils/pagination';
import { getHumanDate } from '~/utils/date';
import { Env } from '~/config';

import "@material/web/icon/icon";
import "@material/web/menu/menu";
import "@material/web/menu/menu-item";
import "@material/web/chips/assist-chip";
import "@material/web/iconbutton/icon-button";
import "@material/web/textfield/filled-text-field";

import VTable from '~/components/VTable.vue';
import VPagination from "~/components/VPagination.vue";
import DialogAdminEvents from "~/components/dialogs/DialogAdminEvents.vue";

const data = ref({
  total: 0,
  page: getStore("tabs_events_page") ? parseInt(getStore("tabs_events_page")) : 1,
  search: "",
  events: [] as EventModel[],
  column: EventEnum.title
});

const message = ref("");
const store = useStore();
const dialog = useDialog();
const isLoading = ref(true);
const isMenuOpen = ref(false);
const isDialogOpen = ref(false);
const isSearched = ref(false);
const event = ref<EventModel>();

const headers: TableHeader[] = [
  { id: EventEnum.id, text: "#" },
  { id: EventEnum.title, text: "Title" },
  { id: EventEnum.description, text: "Description" },
  { id: EventEnum.venue, text: "Venue" },
  { id: EventEnum.date, text: "Date" },
];

onMounted(fetchEvents);

watch(isDialogOpen, v => {
  if (!v) event.value = undefined;  
});

function goToPage(page: number) {
  data.value.page = page;
  fetchEvents(isSearched ? data.value.search : "");
}

function fetchEvents(search = "") {
  isLoading.value = true;
  store.isLoading = true;

  if (!isSearched.value && search.length > 0) {
    data.value.page = 1;
  }

  isSearched.value = search.length > 0;

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

function onDelete(data: EventModel) {
  const id = dialog.open({
    title: "Delete Event",
    message: "Are you sure you want to delete this event?",
    ok: {
      text: "Delete",
      click() {
        store.isLoading = true;

        makeRequest("DELETE", Endpoints.EventsId, { id: data.id }, response => {
          store.isLoading = false;

          if (response.success) {
            fetchEvents();
            dialog.close(id);
            toast.success(response.message);
            return;
          }

          toast.error(response.message);
        });
      }
    }
  });
}
</script>
