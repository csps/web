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
            <md-filled-button @click="fetchStudents(data.search)" :disabled="store.isLoading">
              Search
            </md-filled-button>
          </div>
        </div>

        <VTable class="mt-5" :headers="headers" :data="data.students">
          <template #attendance="{ row }: { row: ICTStudentModel }">
            <span :class="row.attendance ? 'text-primary' : 'text-outline'">
              {{ row.attendance ? 'Present' : '(No record)' }}
            </span>
          </template>
          <template #order_confirmed="{ row }: { row: ICTStudentModel }">
            <span v-if="row.order_confirmed">
              {{ row.order_confirmed }}
            </span>
            <span class="text-outline" v-else>
              (Not confirmed)
            </span>
          </template>
          <template #actions="{ row }: { row: ICTStudentModel }">
            <div class="space-x-2">
              <md-assist-chip
                label="More info"
                @click="moreInfo(row)"
              />
              <md-assist-chip
                title="Confirm Order" 
                :disabled="row.order_confirmed"
                :label="row.order_confirmed ? 'Confirmed' : 'Confirm'"
                @click="confirmOrder(row)"
              />
            </div>
          </template>
        </VTable>

        <div v-if="message.length > 0 && data.students.length === 0" class="flex justify-center py-4 text-error font-medium">
          {{ message }}
        </div>

        <VPagination
          class="mt-5"
          v-if="data.students.length > 0"
          :limit="parseInt(Env.ict_students_per_page)"
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
import { useStore, useDialog } from "~/store";
import { icon } from "~/utils/icon";
import { createPagination } from "~/utils/pagination";
import { ICTStudentEnum } from "~/types/models";
import { Env } from "~/config";
import { toast } from "vue3-toastify";
import Strings from "~/config/strings";

import VTable from "~/components/VTable.vue";
import VPagination from "~/components/VPagination.vue";

import "@material/web/progress/circular-progress";
import "@material/web/textfield/outlined-text-field";
import "@material/web/button/filled-button";
import "@material/web/chips/assist-chip";

// Get store 
const store = useStore();
const dialog = useDialog();
const isLoading = ref(true);
const isSearched = ref(false);
const message = ref("");

const headers: TableHeader[] = [
  { id: ICTStudentEnum.student_id, text: "ID", align: "right" },
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
    // If logged in
    if (response.success) {
      store.ictAdmin = response.data;
      store.isLoading = false;
      isLoading.value = false;
      fetchStudents();
    }
  });
});

/**
 * Show more info about the student
 */
function moreInfo(row: ICTStudentModel) {
  const id = dialog.open(`${row.first_name} ${row.last_name}`,
  `
    <div class="flex gap-x-4 leading-6">
      <div>
        <h4>Course</h4>
        <h4>Year Level</h4>
        <h4>T-shirt size</h4>
        <h4>Student ID</h4>
        <h4>Email</h4>
      </div>
      <div>
        <p class="font-medium">${row.course}</p>
        <p class="font-medium">${row.year_level}</p>
        <p class="font-medium">${row.tshirt_size.toUpperCase()}</p>
        <p class="font-medium">${row.student_id}</p>
        <p class="font-medium">${row.email}</p>
      </div>
    </div>
  `,
  {
    text: "Close",
    click() {
      dialog.close(id);
    }
  }, null);
}

function confirmOrder(row: ICTStudentModel) {
  const id = dialog.open(
    Strings.ICT_CONGRESS_CONFIRM_TITLE,
    `${Strings.ICT_CONGRESS_CONFIRM_MESSAGE}<br><br>This confirmation is for ${row.first_name} ${row.last_name}`, {
    text: "Confirm",
    click() {
      store.isLoading = true;
      dialog.close(id);

      // Confirm order
      makeRequest("POST", Endpoints.ICTCongressStudentConfirm, { student_id: row.student_id }, response => {
        store.isLoading = false;

        if (response.success) {
          toast.success(response.message);
          fetchStudents(isSearched.value ? data.value.search : "");
          return;
        }

        toast.error(response.message);
      });
    }
  }, {
    text: "Cancel",
    click() {
      dialog.close(id);
    }
  });
}

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

  makeRequest<ICTStudentEnum[], Record<string, string>>("GET", Endpoints.ICTCongressStudents, request, response => {
    store.isLoading = false;
    console.log(response);

    if (response.success) {
      data.value.students = response.data;
      data.value.total = response.count ?? 0;
      return;
    }

    message.value = response.message;
    data.value.students = [];
  });
}
</script>

<style lang="scss" scoped>
md-circular-progress {
  --md-circular-progress-active-indicator-width: 12;
}
</style>