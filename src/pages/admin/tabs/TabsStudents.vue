<template>
 <div class="container mx-auto px-4">
    <div class="flex justify-between items-center flex-col lg:flex-row gap-3 mb-3">
      <div class="flex items-center flex-col lg:flex-row gap-3 text-2xl font-medium text-on-surface-variant">
        <div class="flex gap-3 mb-2 lg:mb-0">
          <h2>Students</h2>
          <md-assist-chip label="Add" aria-label="Add event" title="Add event" @click="isDialogOpen = true">
            <md-icon slot="icon" v-html="icon('add')" />
          </md-assist-chip>
        </div>

        <div class="flex justify-center items-center flex-wrap gap-2 mb-3 lg:mb-0">
          <md-filter-chip
            v-for="year in 4"
            :key="year"
            :selected="data.filterYear.includes(year)"
            :label="mapYear(year)"
            @click="onFilter(year)"
            elevated
          />
        </div>
      </div>

      <div class="flex items-center gap-3 relative bottom-2">
        <md-filled-text-field  @keyup.enter="fetchStudents(data.search)" v-model="data.search" :label="capitalize(data.column)">
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
                  v-for="option in StudentEnum"
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
        <md-filled-button @click="fetchStudents(data.search)" :disabled="isLoading">
          Search
        </md-filled-button>
      </div>
    </div>

    <VTable
      :loading="isLoading"
      :headers="headers"
      :data="data.students"
      @edit="onEdit"
      @delete="onDelete"
      hoverable
    >
      <template v-slot:date_stamp="{ row }: { row: StudentModel }">
        {{ getHumanDate(new Date(row.date_stamp)) }}
      </template>
    </VTable>

    <div v-if="message.length > 0 && data.students.length === 0" class="flex justify-center py-4 text-error font-medium">
      {{ message }}
    </div>

    <VPagination
      class="mt-5"
      v-if="data.students.length > 0"
      :limit="parseInt(Env.admin_students_per_page)"
      :page="data.page"
      :total="data.total"
      @change="p => goToPage(p)"
    />
  </div>
</template>

<script lang="ts" setup>
import { Env } from '~/config';
import { onMounted, ref } from 'vue';
import { icon } from '~/utils/icon';
import { useStore } from '~/store';
import { createPagination } from '~/utils/pagination';
import { StudentEnum } from '~/types/models';
import { Endpoints, makeRequest } from '~/network/request';
import { PaginationRequest } from '~/types/request';
import { capitalize } from '~/utils/string';
import { getHumanDate } from '~/utils/date';

import VTable from '~/components/VTable.vue';
import VPagination from "~/components/VPagination.vue";

import "@material/web/icon/icon";
import "@material/web/menu/menu";
import "@material/web/menu/menu-item";
import "@material/web/chips/assist-chip";
import "@material/web/chips/filter-chip";
import "@material/web/iconbutton/icon-button";
import "@material/web/textfield/filled-text-field";

const message = ref("");
const store = useStore();
const isDialogOpen = ref(false);
const isMenuOpen = ref(false);
const isLoading = ref(false);
const isSearched = ref(false);
const student = ref<StudentModel>();

const headers: TableHeader[] = [
  { id: StudentEnum.student_id, text: "ID" },
  { id: StudentEnum.first_name, text: "First name" },
  { id: StudentEnum.last_name, text: "Last name" },
  { id: StudentEnum.email_address, text: "Email" },
  { id: StudentEnum.year_level, text: "Year Level" },
  { id: StudentEnum.date_stamp, text: "Date Added" },
];

const data = ref({
  total: 0,
  page: 1,
  search: "",
  students: [] as StudentModel[],
  column: StudentEnum.last_name,
  filterYear: [1, 2, 3, 4]
});

onMounted(fetchStudents);

function goToPage(page: number) {
  data.value.page = page;
  fetchStudents(isSearched ? data.value.search : "");
}

function fetchStudents(search = "") {
  isLoading.value = true;
  store.isLoading = true;

  const request = createPagination({
    page: data.value.page,
    limit: Number(Env.admin_students_per_page),
    search: {
      key: [data.value.column, ...Array(data.value.filterYear.length).fill(StudentEnum.year_level)],
      value: [search, ...data.value.filterYear]
    },
    sort: {
      key: StudentEnum.last_name,
      type: "ASC"
    }
  });

  if (data.value.filterYear.length === 0) {
    message.value = "Select at least one status";
    isLoading.value = false;
    store.isLoading = false;
    data.value.students = [];
    return;
  }

  makeRequest<StudentModel[], PaginationRequest>("GET", Endpoints.Students, request, response => {
    isLoading.value = false;
    store.isLoading = false;
    data.value.students = [];

    if (response.success) {
      data.value.total = response.count || 0;
      data.value.students = response.data;
      return;
    }

    message.value = response.message;
  });
}

function onFilter(year: number) {
  const index = data.value.filterYear.indexOf(year);

  if (index === -1) {
    data.value.filterYear.push(year);
  } else {
    data.value.filterYear.splice(index, 1);
  }

  data.value.filterYear = [...data.value.filterYear];
  fetchStudents(isSearched ? data.value.search : "");
}

function mapYear(year: number) {
  switch (year) {
    case 1: return "1st Year";
    case 2: return "2nd Year";
    case 3: return "3rd Year";
    case 4: return "4th Year";
  }
}

function onEdit(data: StudentModel) {
  student.value = data;
  isDialogOpen.value = true;
}

function onDelete(_: EventModel) {

}
</script>
