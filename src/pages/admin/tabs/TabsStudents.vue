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
            <md-icon-button id="students-sort-menu" class="mr-2" title="Filter by" @click.stop="isMenuOpen = !isMenuOpen">
              <md-icon v-html="icon('filter_list')" />
            </md-icon-button>
            <md-menu
              :open="isMenuOpen"
              anchor="students-sort-menu"
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

          <md-icon-button class="mr-2" title="Add student" @click="isDialogOpen = true">
            <md-icon v-html="icon('add')" />
          </md-icon-button>
        </div>

      </md-outlined-text-field>
    </div>
    
    <div class="flex justify-center items-center flex-wrap gap-2 mt-4">
      <md-filter-chip
        v-for="year in 4"
        :key="year"
        :selected="data.filterYear.includes(year)"
        :label="mapYear(year)"
        @click="onFilter(year)"
        elevated
      />
    </div>

    <div class="flex justify-center flex-col items-center container mx-auto px-6">
      <div v-if="data.students.length > 0" class="mt-8 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-3">
        <CardStudent v-for="student in data.students" :key="student.id" :student="student" />
      </div>
      <div v-else class="flex justify-center mt-8 flex-grow">
        {{ message || "Fetching students..." }}
      </div>
  
      <VPagination
        class="mt-5"
        v-if="data.students.length > 0"
        :limit="parseInt(Env.admin_students_per_page)"
        :page="data.page"
        :total="data.total"
        @change="p => data.page = p"
      />
    </div>

    <DialogAdminStudent v-model="isDialogOpen" @done="fetchStudents" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { StudentEnum } from "~/types/models";
import { icon } from '~/utils/icon';
import { capitalize } from '~/utils/string';
import { useStore } from '~/store';
import { Env } from '~/config';
import { Endpoints, makeRequest } from '~/network/request';
import { createPagination } from '~/utils/pagination';
import { PaginationRequest } from '~/types/request';

import "@material/web/icon/icon";
import "@material/web/chips/filter-chip";
import "@material/web/textfield/outlined-text-field";
import "@material/web/select/outlined-select";
import "@material/web/button/filled-button";

import CardStudent from '../components/CardStudent.vue';
import VPagination from "~/components/VPagination.vue";
import DialogAdminStudent from '~/components/dialogs/DialogAdminStudent.vue';

const store = useStore();
const isLoading = ref(false);
const isDialogOpen = ref(false);
const isMenuOpen = ref(false);
const message = ref("");

const data = ref({
  total: 0,
  page: 1,
  search: "",
  students: [] as StudentModel[],
  column: StudentEnum.last_name,
  filterYear: [1, 2, 3, 4]
});

watch([
  () => data.value.search,
  () => data.value.column,
  () => data.value.filterYear,
  () => data.value.page,
], v => {
  fetchStudents(v[0]);
});

onMounted(fetchStudents);

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
    data.value.filterYear = [...data.value.filterYear];
    return;
  }

  data.value.filterYear.splice(index, 1);
  data.value.filterYear = [...data.value.filterYear];
}

function mapYear(year: number) {
  switch (year) {
    case 1: return "1st Year";
    case 2: return "2nd Year";
    case 3: return "3rd Year";
    case 4: return "4th Year";
  }
}
</script>