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
            <md-filled-text-field label="Search" type="text" v-model="data.search">
              <md-icon slot="leading-icon" v-html="icon('search', true)" />
            </md-filled-text-field>
            <md-filled-button @click="fetchStudents(data.search)" :disabled="store.isLoading">
              Search
            </md-filled-button>
          </div>
        </div>

        <VTable class="mt-5" :headers="headers" :data="data.students" hover-show-actions>
          <template #attendance="{ row }: { row: ICTStudentModel }">
            <div class="flex items-center justify-center gap-2 text-outline">
              <md-icon :title="row.attendance ? getReadableDate(row.attendance) : ''" v-html="icon(row.attendance ? 'check' : 'remove')"></md-icon>
              <md-icon v-html="icon(row.snack_claimed ? 'check' : 'remove')"></md-icon>
            </div>
          </template>
          <template #order_confirmed="{ row }: { row: ICTStudentModel }">
            <span v-if="row.order_confirmed" :title="getReadableDate(row.order_confirmed)">
              {{ row.order_confirmed }}
            </span>
            <span class="text-outline" v-else>
              (Not confirmed)
            </span>
          </template>
          <template #date_stamp="{ row }: { row: ICTStudentModel }">
            <span :title="getReadableDate(row.date_stamp)">
              {{ row.date_stamp }}
            </span>
          </template>
          <template #actions="{ row }: { row: ICTStudentModel }">
            <div class="space-x-2 flex items-center">
              <md-assist-chip @click="moreInfo(row)" label="Info" />
              <md-assist-chip
                elevated
                @click="row.order_confirmed ? null : confirmOrder(row)"
                :disabled="row.order_confirmed" label="Confirm"
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
import { useRouter } from "vue-router";
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
import "@material/web/textfield/filled-text-field";
import "@material/web/button/filled-button";
import "@material/web/icon/icon";
import "@material/web/chips/assist-chip";
import { getReadableDate } from "~/utils/date";
import { mapYear } from "~/utils/page";

// Get store 
const store = useStore();
const dialog = useDialog();
const router = useRouter();
const isLoading = ref(true);
const isSearched = ref(false);
const message = ref("");

const headers: TableHeader[] = [
  { id: ICTStudentEnum.student_id, text: "ID", align: "right" },
  { id: ICTStudentEnum.first_name, text: "First name" },
  { id: ICTStudentEnum.last_name, text: "Last name" },
  { id: ICTStudentEnum.attendance, text: "Attendance / Snack", align: "center" },
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
      return;
    }

    // If not logged in
    store.isLoading = false;
    isLoading.value = false;
    // Redirect to home
    router.push("/ictcongress2024/admin/login");
  });
});

/**
 * Show more info about the student
 */
function moreInfo(row: ICTStudentModel) {
  const id = dialog.open(`${row.first_name} ${row.last_name}`,
  `
    <div class="grid grid-cols-2 gap-y-1">
      <div>Student ID</div>
      <div>${row.student_id}</div>
      <div>First name</div>
      <div>${row.first_name}</div>
      <div>Last name</div>
      <div>${row.last_name}</div>
      <div>Email</div>
      <div>${row.email}</div>
      <div>Course</div>
      <div>${row.course}</div>
      <div>Year level</div>
      <div>${mapYear(row.year_level)}</div>
      <div>Attendance</div>
      <div>${row.attendance ? getReadableDate(row.date_stamp) : "(No record)"}</div>
      <div>Snack</div>
      <div>${row.snack_claimed ? "Claimed" : "(No record)"}</div>
      <div>Date confirmed</div>
      <div>${row.order_confirmed ? getReadableDate(row.order_confirmed) : "(Not confirmed)"}</div>
      <div>Date registered</div>
      <div>${getReadableDate(row.date_stamp)}</div>
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

md-assist-chip {
  --md-sys-color-surface-container-low: var(--md-sys-color-surface-container-highest);
  --_elevated-container-elevation: 0;
  --_elevated-hover-container-elevation: 0;
  --_elevated-focus-container-elevation: 0;
  --_elevated-pressed-container-elevation: 0;
  --_label-text-color: var(--md-sys-color-secondary);
  --_focus-label-text-color: var(--md-sys-color-primary);
  --_hover-label-text-color: var(--md-sys-color-secondary);
  --_elevated-disabled-container-color: var(--md-sys-color-surface-variant);
  --_outline-width: 0;
}

.action {
  @apply border-dashed border-outline;
}
</style>