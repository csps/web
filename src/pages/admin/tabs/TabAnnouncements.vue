<template>
  <div class="container mx-auto px-6">

    <div class="flex justify-between items-center flex-col lg:flex-row gap-3 mb-3">
      <div class="flex items-center gap-3 text-2xl font-medium text-on-surface-variant mb-3">
        <h2>Announcements</h2>
        <md-assist-chip label="Add" aria-label="Add announcement" title="Add announcement" @click="isDialogOpen = true">
          <md-icon slot="icon" v-html="icon('add')" />
        </md-assist-chip>
      </div>

      <div class="flex items-center gap-3">
        <md-filled-text-field v-model="data.search" :label="capitalize(data.column)" @keyup.enter="fetchAnnouncements(data.search)">
          <md-icon slot="leading-icon" v-html="icon('search')" />
          <div slot="trailing-icon">
            <div class="relative">
              <md-icon-button id="announcements-sort-menu" class="mr-2" title="Filter by" @click.stop="isMenuOpen = !isMenuOpen">
                <md-icon v-html="icon('filter_list')" />
              </md-icon-button>
              <md-menu
                :open="isMenuOpen"
                anchor="announcements-sort-menu"
                @closed="isMenuOpen = false"
                class="min-w-min"
                y-offset="8"
                anchor-corner="end-end"
                menu-corner="start-end"
              >
                <md-menu-item
                  v-for="option in AnnouncementEnum"
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
        <md-filled-button @click="fetchAnnouncements(data.search)" :disabled="isLoading">
          Search
        </md-filled-button>
      </div>
    </div>
    <div>
      <VTable
        :headers="headers"
        :data="data.announcements.map(announcement => ({
          ...announcement,
          date_stamp: getReadableDate(announcement.date_stamp)
        }))"

        @edit="announcement = $event; isDialogOpen = true"
        @delete="deleteAnnouncement($event)"
      />

      <div v-if="message.length > 0 && data.announcements.length === 0" class="flex justify-center py-4 text-error font-medium">
        {{ message }}
      </div>

      <VPagination
        class="mt-5"
        v-if="data.announcements.length > 0"
        :limit="parseInt(Env.admin_announcements_per_page)"
        :page="data.page"
        :total="data.total"
        @change="p => goToPage(p)"
      />
    </div>

    <DialogAdminAnnouncement
      v-model="isDialogOpen"
      :announcement="announcement"
      @done="fetchAnnouncements"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { icon } from "~/utils/icon";
import { AnnouncementEnum } from "~/types/models";
import { capitalize } from "~/utils/string";
import { Env } from "~/config";
import { useStore, useDialog } from "~/store";
import { Endpoints, makeRequest } from "~/network/request";
import { toast } from "vue3-toastify";
import { getReadableDate } from "~/utils/date";
import { createPagination } from "~/utils/pagination";
import type { PaginationRequest } from "~/types/request";

import "@material/web/icon/icon";
import "@material/web/chips/assist-chip";
import "@material/web/textfield/filled-text-field";

import VTable from "~/components/VTable.vue";
import VPagination from "~/components/VPagination.vue";
import DialogAdminAnnouncement from "~/components/dialogs/DialogAdminAnnouncement.vue";

const store = useStore();
const dialog = useDialog();
const isMenuOpen = ref(false);
const isDialogOpen = ref(false);
const isLoading = ref(false);
const isSearched = ref(false);
const announcement = ref<AnnouncementModel>();
const message = ref("");
const data = ref({
  total: 0,
  page: 1,
  search: "",
  announcements: [] as AnnouncementModel[],
  column: AnnouncementEnum.title
});

const headers: TableHeader[] = [
  { id: "id", text: "#" },
  { id: "title", text: "Title" },
  { id: "content", text: "Description" },
  { id: "date_stamp", text: "Created At" },
];

watch(isDialogOpen, v => {
  if (!v) {
    announcement.value = undefined;
  }
});

onMounted(fetchAnnouncements);

function goToPage(page: number) {
  data.value.page = page;
  fetchAnnouncements(isSearched ? data.value.search : "");
}

function fetchAnnouncements(search = "") {
  isLoading.value = true;
  store.isLoading = true;
  
  if (!isSearched.value && search.length > 0) {
    data.value.page = 1;
  }

  isSearched.value = search.length > 0;

  const request = createPagination({
    page: data.value.page,
    limit: Number(Env.admin_announcements_per_page),
    search: {
      key: [data.value.column],
      value: [search]
    },
    sort: {
      key: AnnouncementEnum.date_stamp,
      type: "DESC"
    }
  });

  makeRequest<AnnouncementModel[], PaginationRequest>("GET", Endpoints.Announcements, request, response => {
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

function deleteAnnouncement(announcement: AnnouncementModel) {
  const id = dialog.open("Delete Announcement", "Are you sure you want to delete this announcement?", {
    text: "Delete",
    click() {
      store.isLoading = true;
    
      makeRequest<AnnouncementModel, AnnouncementModel>("DELETE", Endpoints.AnnouncementsId, announcement, response => {
        store.isLoading = false;
        dialog.close(id);
        
        if (response.success) {
          fetchAnnouncements();
          toast.success(response.message);
          return;
        }
    
        message.value = response.message;
        toast.error(response.message);
      });
    }
  });
}
</script>
