<template>
  <div class="flex flex-col justify-center items-center w-full px-6 container mx-auto h-full">
    <div class="flex items-center gap-3">
      <md-outlined-text-field
        v-model="data.search"
        :label="'Search ' + capitalize(data.column)"
      >
        <md-icon slot="leadingicon" v-html="icon('search')" />
      </md-outlined-text-field>
      <md-outlined-select v-model="data.column" label="Filter by" quick>
        <md-icon slot="leadingicon" v-html="icon('filter_list', true)" />
        <md-select-option
          v-for="option in StudentEnum"
          :key="option"
          :value="option"
          :headline="capitalize(option)"
        />
      </md-outlined-select>

    </div>

    
    <div class="flex justify-center items-center flex-wrap gap-2 mt-4">
      <md-filter-chip
      v-for="year in 4"
        elevated
        :key="year"
        :selected="data.filterYear.includes(year)"
        :label="mapYear(year)"
        @click="onFilter(year)"
      />
    </div>

    <md-filled-button class="mt-5">
      <md-icon slot="icon" v-html="icon('add')" />
      Add Student
    </md-filled-button>

    <div v-if="data.students.length > 0" class="space-y-3 mt-5 w-full lg:w-1/2 2xl:w-1/3">
      <StudentCard v-for="student in data.students" :key="student.id" :student="student" />
    </div>
    <div v-else class="flex justify-center mt-8 flex-grow">
      {{ message || "Fetching students..." }}
    </div>
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

import "@material/web/icon/icon";
import "@material/web/chips/filter-chip";
import "@material/web/textfield/outlined-text-field";
import "@material/web/select/outlined-select";
import "@material/web/button/filled-button";

import StudentCard from '../components/StudentCard.vue';

const store = useStore();
const isLoading = ref(false);
const message = ref("");

const data = ref({
  total: 0,
  page: 1,
  search: "",
  students: [] as StudentModel[],
  column: StudentEnum.student_id,
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

  const request: any = {
    search_value: [search, ...data.value.filterYear],
    search_column: [data.value.column, ...Array(data.value.filterYear.length).fill(StudentEnum.year_level)],
    page: data.value.page,
    limit: Env.admin_students_per_page
  };

  if (data.value.filterYear.length === 0) {
    message.value = "Select at least one status";
    isLoading.value = false;
    store.isLoading = false;
    data.value.students = [];
    return;
  }

  makeRequest<StudentModel[]>("GET", Endpoints.Students, request, response => {
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