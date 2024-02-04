<template>
  <div class="container mx-auto px-6 py-6 h-full flex-grow flex justify-center">

    <Transition name="slide-fade" mode="out-in">
      <div v-if="isLoading" class="flex justify-center items-center flex-col gap-3">
        <md-circular-progress size="10" indeterminate />
        <p>Validating session...</p>
      </div>
      
      <div v-else class="flex flex-col w-full">

        <div class="flex justify-between w-full">
          <div>
            <h4 class="font-bold text-lg">ICT Congress 2024</h4>
            <p>{{ store.ictAdmin.campus_name }}</p>
          </div>
          <div class="flex items-center gap-3">
            <md-outlined-text-field label="Search" type="text" v-model="data.search">
              <md-icon slot="leading-icon" v-html="icon('search', true)" />
            </md-outlined-text-field>
            <md-filled-button @click="fetchStudents(data.search)">
              Search
            </md-filled-button>
          </div>
        </div>

        <VTable class="mt-5" :headers="headers" :data="data.students" no-action>
          <template #attendance="{ row }: { row: ICTStudentModel }">
            <span :class="row.attendance ? 'text-success' : 'text-error'">
              {{ row.attendance ? 'Present' : 'Absent' }}
            </span>
          </template>
          <template #order_confirmed="{ row }: { row: ICTStudentModel }">
            <span v-if="row.order_confirmed" class="text-success">
              {{ row.order_confirmed }}
            </span>
            <span v-else class="text-error">
              Not confirmed
            </span>
          </template>
        </VTable>

        <div v-if="message.length > 0 && data.students.length === 0" class="flex justify-center py-4 text-error font-medium">
          {{ message }}
        </div>

        <VPagination
          class="mt-5"
          v-if="data.students.length > 0"
          :limit="parseInt(Env.admin_announcements_per_page)"
          :page="data.page"
          :total="data.total"
          @change="p => goToPage(p)"
        />
      </div>
    </Transition>

  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Endpoints, makeRequest } from "~/network/request";
import { useStore } from "~/store";
import { icon } from "~/utils/icon";
import { createPagination } from "~/utils/pagination";
import { ICTStudentEnum } from "~/types/models";
import { toast } from "vue3-toastify";
import { Env } from "~/config";

import VTable from "~/components/VTable.vue";
import VPagination from "~/components/VPagination.vue";

import "@material/web/progress/circular-progress";
import "@material/web/textfield/outlined-text-field";
import "@material/web/button/filled-button";

// Get store 
const store = useStore();
const isLoading = ref(true);
const isSearched = ref(false);
const message = ref("");

const headers: TableHeader[] = [
  { id: ICTStudentEnum.student_id, text: "#", align: "right" },
  { id: ICTStudentEnum.year_level, text: "Year Level", align: "right" },
  { id: ICTStudentEnum.first_name, text: "First name" },
  { id: ICTStudentEnum.last_name, text: "Last name" },
  { id: ICTStudentEnum.attendance, text: "Attendance", align: "center" },
  { id: ICTStudentEnum.order_confirmed, text: "Date Confirmed", align: "center" },
  { id: ICTStudentEnum.date_stamp, text: "Date registered", align: "center" }
];

const data = ref({
  total: 0,
  page: 1,
  search: "",
  students: [] as ICTStudentEnum[],
  column: Object.keys(ICTStudentEnum)
});

onMounted(() => {
  // If has token, check if valid
  makeRequest<ICTAdminModel, null>("GET", Endpoints.ICTCongressLogin, null, response => {
    console.log(response);

    // If logged in
    if (response.success) {
      store.ictAdmin = response.data;
      store.isLoading = false;
      isLoading.value = false;
      fetchStudents();
    }
  });
});

function goToPage(page: number) {
  data.value.page = page;
  fetchStudents(isSearched ? data.value.search : "");
}

function fetchStudents(search = "") {
  store.isLoading = true;
  
  if (!isSearched.value && search.length > 0) {
    data.value.page = 1;
  }

  isSearched.value = search.length > 0;

  const request = createPagination({
    page: data.value.page,
    limit: Number(Env.ict_students_per_page),
    search: {
      key: data.value.column,
      value: data.value.column.map(() => data.value.search)
    },
    sort: {
      key: ICTStudentEnum.last_name,
      type: "DESC"
    }
  });

  makeRequest<ICTStudentEnum[], Record<string, string>>("GET", Endpoints.ICTCongressStudentSearch, request, response => {
    store.isLoading = false;

    if (response.success) {
      data.value.students = response.data;
      data.value.total = response.count ?? 0;
      return;
    }

    message.value = response.message;
    data.value.students = [];
    toast.error(response.message);
  });
}
</script>

<style lang="scss" scoped>
md-circular-progress {
  --md-circular-progress-active-indicator-width: 12;
}
</style>