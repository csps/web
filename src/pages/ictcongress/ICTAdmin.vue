<template>
  <div class="container mx-auto px-6 py-6 h-full flex-grow flex justify-center">
    <Transition name="slide-fade" mode="out-in">
      <div v-if="isLoading" class="flex justify-center items-center flex-col gap-3">
        <md-circular-progress size="10" indeterminate />
        <p>Validating session...</p>
      </div>
      
      <div v-else class="flex flex-col w-full">
        <div class="flex flex-col sm:flex-row gap-5 justify-between w-full">
          <div class="text-center sm:text-left">
            <h4 class="font-bold text-lg">ICT Congress 2024</h4>
            <p>{{ store.ictAdmin.campus_name }}</p>
          </div>
          <div class="flex items-center justify-center sm:justify-end gap-3">
            <md-filled-text-field label="Search" type="text" v-model="data.search" @keyup.enter="fetchStudents(data.search)" :disabled="store.isLoading">
              <md-icon-button slot="trailing-icon" v-if="data.search.length > 0" @click="data.search = ''" title="Clear search">
                <md-icon v-html="icon('cancel', true)" />
              </md-icon-button>
            </md-filled-text-field>
            <md-fab elevation="0" @click="fetchStudents(data.search)" :disabled="store.isLoading" title="Search student">
              <md-icon slot="icon" v-html="icon('search', true)" />
            </md-fab>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-5 justify-between items-center mt-5">
          <div>
            <md-outlined-button @click="isCampusOptionsOpen = true">
              <md-icon slot="icon" v-html="icon('settings', true)" />
              Show options
            </md-outlined-button>
          </div>
          <md-chip-set class="flex justify-center">
            <md-filter-chip
              v-for="filter in data.filterColumns"
              :key="filter.id"
              :label="`${filter.name} – ${mapStatCount(filter.id) ?? 0}`"
              :selected="data.filter === filter.id && (data.filterLogic !== undefined && data.filterLogic > 0)"
              @click="change(filter)"
            />
          </md-chip-set>
        </div>

        <p class="mt-5 text-center sm:text-left font-medium text-secondary">
          Showing data for {{ data.filter === ICTStudentEnum.payment_confirmed && data.filterLogic === 0 ?
            'pending payments (default)' : data.filterColumns.find(f => f.id === data.filter)?.name.toLowerCase() }}
        </p>

        <VTable class="mt-5" :headers="headers" :data="data.students">
          <template #attendance="{ row }: { row: ICTStudentModel }">
            <div class="flex items-center justify-center gap-2 text-outline">
              <md-icon :title="row.attendance ? getReadableDate(row.attendance) : ''" v-html="icon(row.attendance ? 'check' : 'remove')"></md-icon>
              <md-icon :title="row.snack_claimed ? 'Claimed' : 'Not yet claimed'" v-html="icon(row.snack_claimed ? 'check' : 'remove')"></md-icon>
            </div>
          </template>
          <template #payment_confirmed="{ row }: { row: ICTStudentModel }">
            <span v-if="row.payment_confirmed" :title="getReadableDate(row.payment_confirmed)">
              {{ row.payment_confirmed }}
            </span>
            <span class="text-outline" v-else>
              (Not confirmed)
            </span>
          </template>
          <template #tshirt_claimed="{ row }: { row: ICTStudentModel }">
            <span v-if="row.tshirt_claimed" :title="getReadableDate(row.tshirt_claimed)">
              {{ row.tshirt_claimed }}
            </span>
            <span class="text-outline" v-else>
              ({{ row.payment_confirmed ? 'Not claimed' : 'No payment' }})
            </span>
          </template>
          <template #date_stamp="{ row }: { row: ICTStudentModel }">
            <span :title="getReadableDate(row.date_stamp)">
              {{ row.date_stamp }}
            </span>
          </template>
          <template #actions="{ row }: { row: ICTStudentModel }">
            <div class="space-x-2 flex items-center">
              <md-icon-button @click="showStudentOptions(row)">
                <md-icon v-html="icon('settings', true)"></md-icon>
              </md-icon-button>
            </div>
          </template>
        </VTable>

        <div v-if="message.length > 0 && data.students.length === 0" class="flex justify-center py-4 text-on-surface-variant">
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

    <DialogICTStudentOptions
      :student="selectedStudent"
      v-model="hasSelectedStudent"
      :disabled-options="disabledOptions"
      @select="doStudentAction"
    />

    <DialogICTCampusOptions
      v-model="isCampusOptionsOpen"
      :campus="ict.campuses.find(c => c.campus === store.ictAdmin.campus)"
      @select="doCampusAction"
    />

    <DialogICTRFID
      v-model="isRFIDDialogOpen"
      :student="selectedStudent"
      @proceed="onScanRFID"
    />

    <DialogICTRemoveOrders
      v-model="isRemoveOrdersConfirmOpen"
      @proceed="onRemovePendingOrders"
    />

    <DialogICTRemoveStudent
      v-model="isRemoveStudentDialogOpen"
      :student="selectedStudent"
      @proceed="onRemoveStudent"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { saveAs } from 'file-saver';
import { Endpoints, makeRequest } from "~/network/request";
import { useStore, useDialog, useIctStore } from "~/store";
import { icon } from "~/utils/icon";
import { createPagination } from "~/utils/pagination";
import { ICTStudentEnum } from "~/types/models";
import { Env } from "~/config";
import { toast } from "vue3-toastify";

import VTable from "~/components/VTable.vue";
import VPagination from "~/components/VPagination.vue";
import DialogICTStudentOptions from "~/components/dialogs/DialogICTStudentOptions.vue";
import DialogICTCampusOptions from "~/components/dialogs/DialogICTCampusOptions.vue";
import DialogICTRFID from "~/components/dialogs/DialogICTRFID.vue";
import DialogICTRemoveOrders from "~/components/dialogs/DialogICTRemoveOrders.vue";
import DialogICTRemoveStudent from "~/components/dialogs/DialogICTRemoveStudent.vue";

import "@material/web/progress/circular-progress";
import "@material/web/textfield/filled-text-field";
import "@material/web/button/outlined-button";
import "@material/web/button/filled-button";
import "@material/web/icon/icon";
import "@material/web/chips/assist-chip";
import "@material/web/chips/chip-set";
import "@material/web/chips/filter-chip";
import "@material/web/iconbutton/icon-button";
import "@material/web/fab/fab";

import { getReadableDate } from "~/utils/date";
import { mapYear } from "~/utils/page";
import Strings from "~/config/strings";

// Get store 
const store = useStore();
const dialog = useDialog();
const ict = useIctStore();
const router = useRouter();
const isLoading = ref(true);
const isSearched = ref(false);
const selectedStudent = ref<ICTStudentModel>();
const hasSelectedStudent = ref(false);
const isRemoveStudentDialogOpen= ref(false);
const isRemoveOrdersConfirmOpen = ref(false);
const isCampusOptionsOpen = ref(false);
const isRFIDDialogOpen = ref(false);
const isAuth = ref(false);
const disabledOptions = ref<number[]>([])
const message = ref("");

const headers: TableHeader[] = [
  { id: ICTStudentEnum.student_id, text: "ID", align: "right" },
  { id: ICTStudentEnum.first_name, text: "First name" },
  { id: ICTStudentEnum.last_name, text: "Last name" },
  { id: ICTStudentEnum.attendance, text: "Attendance / Snack", align: "center" },
  { id: ICTStudentEnum.payment_confirmed, text: "Payment Confirmed", align: "center" },
  { id: ICTStudentEnum.tshirt_claimed, text: "T-shirt Claimed", align: "center" },
  { id: ICTStudentEnum.date_stamp, text: "Date registered", align: "center" }
];

const data = ref({
  total: 0,
  page: 1,
  search: "",
  filterColumns: [
    { id: -1, name: "All" },
    { id: ICTStudentEnum.attendance, name: "Present" },
    { id: ICTStudentEnum.snack_claimed, name: "Snack Claimed" },
    { id: ICTStudentEnum.payment_confirmed, name: "Payment Confirmed" },
    { id: ICTStudentEnum.tshirt_claimed, name: "T-shirt Claimed" },
  ] as {id: ICTStudentEnum | -1, name: string}[],
  filter: ICTStudentEnum.payment_confirmed as (number | ICTStudentEnum),
  filterLogic: 0 as (number | undefined),
  students: [] as ICTStudentEnum[],
  column: Object.keys(ICTStudentEnum)
});

type ICTConfig = {
  courses: ICTCourse[];
  tshirt_sizes: ICTShirtSize[];
  campuses: ICTCampus[];
};

watch(isRFIDDialogOpen, v => {
  if (!v && !selectedStudent.value?.rfid) {
    askForRFID(selectedStudent.value!);
  }
});

onMounted(() => {
  // If has token, check if valid
  makeRequest<ICTAdminModel, null>("GET", Endpoints.ICTCongressLogin, null, response => {
    // If logged in
    if (response.success) {
      store.ictAdmin = response.data;
      store.isLoading = false;
      isLoading.value = false;
      isAuth.value = true;
      fetchStudents();
      return;
    }

    // Redirect to home
    router.push("/ictcongress2024/admin/login");
    // If not logged in
    store.isLoading = false;
  });

  makeRequest<ICTConfig, null>("GET", Endpoints.ICTCongress, null, response => {
    if (response.success) {
      ict.campuses = response.data.campuses;
      return;
    }

    toast.error(response.message);
  });

  fetchStats();
});

/**
 * Fetch status statistics
 */
function fetchStats() {
  makeRequest<ICTStatistics, null>("GET", Endpoints.ICTCongressStatistics, null, response => {
    if (response.success) {
      ict.stats = response.data;
      return;
    }
  
    return toast.error(response.message);
  });
}

/**
 * Change filter
 * 
 * 0 - NULL
 * 1 - NOT NULL
 * 2 - !== 0
 * 
 * @param filter Filter
 */
function change(filter: { id: number | ICTStudentEnum, name: string }) {
  // Reset page filter changed
  data.value.page = 1;

  // If from payment pending to payment confirmed
  if (data.value.filter === ICTStudentEnum.payment_confirmed &&
      data.value.filterLogic === 0 &&
      filter.id === ICTStudentEnum.payment_confirmed
  ) {
    // Set filter loginc to NOT NULL
    data.value.filterLogic = 1;
  }
  
  // Otherwise, set filter to the selected filter
  else {
    data.value.filter = data.value.filter === filter.id ? -2 : filter.id;
    data.value.filterLogic = filter.id === ICTStudentEnum.snack_claimed ? 2 : 1;
  }
  
  // If toggling, set back to payment pending
  if (data.value.filter === -2) {
    data.value.filter = ICTStudentEnum.payment_confirmed;
    data.value.filterLogic = 0;
  }
  
  // Fetch students
  return fetchStudents(isSearched.value ? data.value.search : "");
}

/**
 * Show student options
 */
function showStudentOptions(row: ICTStudentModel) {
  disabledOptions.value = [];

  if (row.payment_confirmed) {
    disabledOptions.value.push(2);
  }

  if (row.tshirt_claimed) {
    disabledOptions.value.push(3);
  }

  selectedStudent.value = row;
  hasSelectedStudent.value = true;
}

/** 
 * Do the selected student action
 */
function doStudentAction(selected: number) {
  if (selected === 1) {
    return moreInfo(selectedStudent.value!);
  }

  if (selected === 2) {
    return askForRFID(selectedStudent.value!);
  }

  if (selected === 3) {
    return claimTshirt(selectedStudent.value!);
  }

  if (selected === 4) {
    hasSelectedStudent.value = false;
    isRemoveStudentDialogOpen.value = true;
    return;
  }
}

/**
 * Show more info about the student
 */
 async function moreInfo(row: ICTStudentModel) {
  store.isLoading = true;

  makeRequest<number, { discount_code: string }>("GET", Endpoints.ICTCongressPrice, {
    discount_code: row.discount_code.length > 0 ? row.discount_code : "-"
  }, response => {
    store.isLoading = false;

    if (!response.success) {
      toast.error(response.message);
    }

    const id = dialog.open(`${row.first_name} ${row.last_name}`,
    `
      <div class="grid grid-cols-2 gap-y-1">
        <div>Student ID</div>
        <div>${row.student_id}</div>
        <div>RFID</div>
        <div>${row.rfid ?? "N/A"}</div>
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
        <div>Discount Code</div>
        <div>${row.discount_code.length > 0 ? row.discount_code : "-"}</div>
        <div>Price</div>
        <div>₱ ${response.data}.00</div>
        <div>Attendance</div>
        <div>${row.attendance ? getReadableDate(row.date_stamp) : "(No record)"}</div>
        <div>Snack Claimed</div>
        <div>${row.snack_claimed ? "Claimed" : "(No record)"}</div>
        <div>Payment confirmed</div>
        <div>${row.payment_confirmed ? getReadableDate(row.payment_confirmed) : "(Not confirmed)"}</div>
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
  });
}

/**
 * Ask if the student has RFID
 */
function askForRFID(row: ICTStudentModel) {
  hasSelectedStudent.value = false;

  const id = dialog.open("Does the student has RFID?", `
    <p>RFID may be used for the student for the event's attendance.</p>
  `, {
    text: "Yes",
    click() {
      dialog.close(id);
      isRFIDDialogOpen.value = true;
    }
  }, {
    text: "No",
    click() {
      dialog.close(id);
      confirmPaymentDialog(row);
    }
  });
}

/**
 * Claim t-shirt
 */
function claimTshirt(row: ICTStudentModel) {
  hasSelectedStudent.value = false;

  const id = dialog.open("Claim T-shirt", `
    <p>
      Claim t-shirt for ${row.first_name} ${row.last_name}?
      After clicking "Yes, claim", the student will be marked as claimed for t-shirt
      and will receive an official QR to be used for the event's attendance.
    </p>
  `, {
    text: "Yes, claim",
    click() {
      dialog.close(id);
      store.isLoading = true;

      makeRequest("POST", Endpoints.ICTCongressTshirtClaim, {
        student_id: row.student_id
      }, response => {
        store.isLoading = false;

        if (response.success) {
          toast.success(response.message);
          fetchStudents(isSearched.value ? data.value.search : "");
          fetchStats();
          return;
        }

        toast.error(response.message);
      });
    }
  }, {
    text: "Cancel",
    click() {
      dialog.close(id);
      hasSelectedStudent.value = true;
    }
  });
}

/**
 * After clicking proceed on Scan RFID dialog
 * @param rfid Student's RFID
 */
function onScanRFID(rfid: string) {
  selectedStudent.value!.rfid = rfid;
  isRFIDDialogOpen.value = false;
  confirmPaymentDialog(selectedStudent.value!);
}

/**
 * Do the selected campus action
 */
function doCampusAction(selected: number) {
  isCampusOptionsOpen.value = false;

  if (selected === 1) {
    exportToSheet();
  }

  if (selected === 2) {
    exportToCsv();
  }
  
  if (selected === 3) {
    isRemoveOrdersConfirmOpen.value = true;
  }
}

/**
 * Export to sheet
 */
function exportToSheet() {
  toast.info("Exporting sheet...");

  makeRequest("GET", Endpoints.ICTCongressExportSheet, null, async (response, fullResponse) => {
    if (response instanceof Blob) {
      if (fullResponse?.headers["content-type"].includes("sheet")) {
        const filename = fullResponse.headers["content-disposition"].split("filename=")[1].replace(/"/g, "");
        saveAs(response as unknown as Blob, filename ?? "ict_congress_2024.xlsx");
        toast.success("Sheet exported successfully.");
        return;
      }

      // Convert blob to text
      const text = JSON.parse(await response.text());
      toast.error(text.message);
      return;
    }

    toast.error(response.message);
  });
}

/**
 * Export to CSV
 */
function exportToCsv() {
  makeRequest("GET", Endpoints.ICTCongressExportCsv, null, (response, fullResponse) => {
    if (fullResponse?.headers["content-type"].includes("csv")) {
      const filename = fullResponse.headers["content-disposition"].split("filename=")[1].replace(/"/g, "");
      saveAs(response as unknown as Blob, filename ?? "ict_congress_2024.csv");
      toast.success("CSV exported successfully.");
      return;
    }

    toast.error(response.message);
  });
}

/**
 * Confirm payment dialog
 * @param row Student model
 */
function confirmPaymentDialog(row: ICTStudentModel) {
  const id = dialog.open(
    Strings.ICT_CONGRESS_CONFIRM_TITLE,
    `${Strings.ICT_CONGRESS_CONFIRM_MESSAGE}<br><br>This confirmation is for ${row.first_name} ${row.last_name}`, {
    text: "Yes, confirm",
    click() {
      store.isLoading = true;
      dialog.close(id);

      // Confirm order
      makeRequest("POST", Endpoints.ICTCongressStudentPaymentConfirm, {
        student_id: row.student_id,
        rfid: row.rfid
      }, response => {
        store.isLoading = false;
        hasSelectedStudent.value = false;

        if (response.success) {
          toast.success(response.message);
          fetchStudents(isSearched.value ? data.value.search : "");
          fetchStats();
          return;
        }

        toast.error(response.message);
      });
    }
  }, {
    text: "Cancel",
    click() {
      hasSelectedStudent.value = true;
      dialog.close(id);
    }
  });
}

/**
 * Remove pending orders
 */
function onRemovePendingOrders() {
  store.isLoading = true;
  isRemoveOrdersConfirmOpen.value = false;

  makeRequest("DELETE", Endpoints.ICTCongressPendingOrders, null, response => {
    store.isLoading = false;

    if (response.success) {
      toast.success(response.message);
      fetchStudents(isSearched.value ? data.value.search : "");
      fetchStats();
      return;
    }

    toast.error(response.message);
  });
}

/**
 * Remove student
 */
function onRemoveStudent(student: ICTStudentModel) {
  store.isLoading = true;
  isRemoveStudentDialogOpen.value = false;

  makeRequest("DELETE", Endpoints.ICTCongressStudentsId, {
    student_id: student.student_id
  }, response => {
    store.isLoading = false;

    if (response.success) {
      toast.success(response.message);
      fetchStudents(isSearched.value ? data.value.search : "");
      fetchStats();
      return;
    }

    toast.error(response.message);
  });
}

/**
 * Go to table page number
 * @param page Page number
 */
function goToPage(page: number) {
  data.value.page = page;
  fetchStudents(isSearched ? data.value.search : "");
}

/**
 * Fetch students
 * @param search Search query
 */
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
    filterColumns: data.value.filterColumns.map(f => f.id),
    filter: data.value.filter,
    filterLogic: data.value.filterLogic,
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

/**
 * Map stat count
 * @param id ICTStudentEnum
 */
function mapStatCount(id: ICTStudentEnum | -1) {
  if (id === -1) return ict.stats.countAll;
  if (id === ICTStudentEnum.attendance) return ict.stats.countPresent;
  if (id === ICTStudentEnum.snack_claimed) return ict.stats.countSnackClaimed;
  if (id === ICTStudentEnum.payment_confirmed) return ict.stats.countPaymentConfirmed;
  if (id === ICTStudentEnum.tshirt_claimed) return ict.stats.countTShirtClaimed;
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

md-fab {
  --_container-elevation: 0;
  --_container-color: var(--md-sys-color-surface-container-highest);
}

.action {
  @apply border-dashed border-outline;
}
</style>