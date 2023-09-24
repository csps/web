<template>
  <div class="flex flex-col justify-center items-center w-full px-6 container mx-auto h-full">
    <md-filled-button @click="isDialogOpen = true" class="mb-5">
      <md-icon slot="icon" v-html="icon('add')" />
      Add Announcement
    </md-filled-button>

    <div class="flex items-center gap-3">
      <md-outlined-text-field
        v-model="data.search"
        :label="'Search ' + capitalize(data.column)"
      >
        <md-icon slot="leadingicon" v-html="icon('search')" />
      </md-outlined-text-field>
      <md-outlined-select v-model="data.column" label="Filter by" class="dense">
        <md-icon slot="leadingicon" v-html="icon('filter_list', true)" />
        <md-select-option
          v-for="option in AnnouncementEnum"
          :key="option"
          :value="option"
          :headline="capitalize(option)"
        />
      </md-outlined-select>
    </div>

    <div v-if="data.announcements.length > 0" class="w-full 2xl:w-2/3 3xl:w-1/2 mt-8 grid grid-cols-1 lg:grid-cols-2 gap-3">
      <CardAnnouncement
        v-for="announcement in data.announcements"
        :key="announcement.id"
        :data="announcement"
        @click="onEdit(announcement)"
      />
    </div>
    <div v-else class="flex justify-center mt-8 flex-grow body-medium">
      {{ message || "Fetching announcements..." }}
    </div>

    <VPagination
      class="mt-5"
      v-if="data.announcements.length > 0"
      :limit="parseInt(Env.admin_announcements_per_page)"
      :page="data.page"
      :total="data.total"
      @change="p => data.page = p"
    />

    <DialogAdminAnnouncement
      v-model="isDialogOpen"
      :announcement="announcement"
      @done="fetchAnnouncements"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { AnnouncementEnum } from "~/types/models";
import { icon } from "~/utils/icon";
import { useStore } from "~/store";
import { capitalize } from "~/utils/string";
import type { PaginationRequest } from "~/types/request";

import { Env } from "~/config";
import { Endpoints, makeRequest } from "~/network/request";

import CardAnnouncement from "~/pages/admin/components/CardAnnouncement.vue";
import DialogAdminAnnouncement from "~/components/dialogs/DialogAdminAnnouncement.vue";
import VPagination from "~/components/VPagination.vue";

const store = useStore();
const isDialogOpen = ref(false);
const announcement = ref<AnnouncementModel>();
const isLoading = ref(false);
const message = ref("");

const data = ref({
  total: 0,
  page: 1,
  search: "",
  announcements: [] as AnnouncementModel[],
  column: AnnouncementEnum.title
});

watch([
  () => data.value.search,
  () => data.value.column,
  () => data.value.page,
], v => {
  fetchAnnouncements(v[0]);
});

onMounted(fetchAnnouncements);

function fetchAnnouncements(search = "") {
  isLoading.value = true;
  store.isLoading = true;

  const request: PaginationRequest = {
    search_value: [search],
    search_column: [data.value.column],
    page: data.value.page,
    limit: Env.admin_announcements_per_page,
    sort_column: AnnouncementEnum.date_stamp,
    sort_type: "DESC"
  };

  makeRequest<AnnouncementModel[]>("GET", Endpoints.Announcements, request, response => {
    isLoading.value = false;
    store.isLoading = false;
    data.value.announcements = [];

    if (response.success) {
      data.value.total = response.count || 0;
      data.value.announcements = response.data;
      return;
    }

    message.value = response.message;
  });
}

function onEdit(data: AnnouncementModel) {
  announcement.value = data;
  isDialogOpen.value = true;
}
</script>