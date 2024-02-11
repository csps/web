<template>
  <div class="ictcongress container flex flex-col items-center justify-center mx-auto px-6">
    <div class="my-10 text-center">
      <h4 class="mb-2 text-2xl font-bold">ICT Congress 2024 - Registration</h4>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut.</p>
    </div>

    <div class="flex flex-col gap-5 w-full sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-2/5 2xl:w-1/3 font-reset" :key="key">
      <!-- Student ID -->
      <md-outlined-text-field v-model.trim="studentId" type="number" label="Student ID" min="0" :disabled="store.isLoading || isRegistered">
        <md-icon slot="leading-icon" v-html="icon('badge', true)" />
      </md-outlined-text-field>

      <!-- First and Last name -->
      <div class="flex gap-5">
        <md-outlined-text-field v-model.trim="firstName" label="First name" :disabled="store.isLoading || isRegistered">
          <md-icon slot="leading-icon" v-html="icon('person', true)" />
        </md-outlined-text-field> 
        <md-outlined-text-field v-model.trim="lastName" label="Last name" :disabled="store.isLoading || isRegistered">
          <md-icon slot="leading-icon" v-html="icon('person', true)" />
        </md-outlined-text-field> 
      </div>

      <!-- Email -->
      <md-outlined-text-field v-model.trim="email" type="email" label="Email" :disabled="store.isLoading || isRegistered">
        <md-icon slot="leading-icon" v-html="icon('mail', true)" />
      </md-outlined-text-field>

      <!-- T-shirt size and campus -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <md-outlined-select v-model="tsize" label="T-shirt size" :disabled="store.isLoading || isRegistered">
          <md-icon slot="leading-icon" v-html="icon('bar_chart', true)" />
          <md-select-option v-for="size in tshirtSizes" :key="size.id" :value="size.id">
            {{ size.name }}
          </md-select-option> 
        </md-outlined-select>
        <md-outlined-select v-model="campus" label="Campus" :disabled="store.isLoading || isRegistered">
          <md-icon slot="leading-icon" v-html="icon('location_city', true)" />
          <md-select-option v-for="campus in campuses" :key="campus.id" :value="campus.id">
            {{ campus.campus_name }}
          </md-select-option>
        </md-outlined-select>
      </div>

      <!-- Course and Year level -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <md-outlined-select v-model="course" label="Course" :disabled="store.isLoading || isRegistered">
          <md-icon slot="leading-icon" v-html="icon('school', true)" />
          <md-select-option v-for="course in courses" :key="course.id" :value="course.id">
            {{ course.course_name }}
          </md-select-option>
        </md-outlined-select>
        <md-outlined-select v-model="yearLevel" label="Year level" :disabled="store.isLoading || isRegistered">
          <md-icon slot="leading-icon" v-html="icon('school', true)" />
          <md-select-option v-for="year in 4" :key="year" :value="year">
            {{ mapYearLevel(year) }}
          </md-select-option>
        </md-outlined-select>
      </div>

      <!-- Register -->
      <div class="flex justify-between">
        <div>
          <md-text-button v-if="isRegistered" @click="clearFields">Reset fields</md-text-button>
        </div>
        <md-filled-button @click="register" :disabled="isRegistered || store.isLoading">
          {{ store.isLoading ? "Registering..." : isRegistered ? 'Registered' : "Register" }}
        </md-filled-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { icon } from "~/utils/icon";
import { useStore, useDialog } from "~/store";
import { Endpoints, makeRequest } from "~/network/request";
import { toast } from "vue3-toastify";

import "@material/web/icon/icon";
import "@material/web/button/filled-button";
import "@material/web/button/text-button";
import "@material/web/textfield/outlined-text-field";
import "@material/web/select/outlined-select";
import "@material/web/select/select-option";

const studentId = ref("");
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const tsize = ref();
const campus = ref();
const course = ref();
const yearLevel = ref();

const store = useStore();
const dialog = useDialog();
const courses = ref<ICTCourse[]>([]);
const tshirtSizes = ref<ICTSize[]>([]);
const campuses = ref<ICTCampus[]>([]);

const key = ref(0);
const isRegistered = ref(false);

type ICTConfig = {
  courses: ICTCourse[];
  tshirt_sizes: ICTSize[];
  campuses: ICTCampus[];
};

onMounted(() => {
  getConfig();
});

function getConfig() {
  store.isLoading = true;

  makeRequest<ICTConfig, null>("GET", Endpoints.ICTCongress, null, response => {
    store.isLoading = false;

    if (response.success) {
      courses.value = response.data.courses;
      tshirtSizes.value = response.data.tshirt_sizes;
      campuses.value = response.data.campuses;
      return;
    }

    toast.error(response.message);
  });
}

function requestRegister() {
  store.isLoading = true;

  const data: ICTStudentRegisterModel = {
    student_id: studentId.value,
    first_name: firstName.value,
    last_name: lastName.value,
    email: email.value,
    tshirt_size_id: tsize.value,
    campus_id: campus.value,
    course_id: course.value,
    year_level: yearLevel.value
  };

  makeRequest<null, typeof data>("POST", Endpoints.ICTCongressStudents, data, response => {
    store.isLoading = false;

    if (response.success) {
        isRegistered.value = true;

      const id = dialog.open("Success", response.message, {
        text: "Got it!",
        click: () => dialog.close(id)
      }, null);
      
      return;
    }

    isRegistered.value = false;
    toast.error(response.message);
  });
}

function register() {
  if (store.isLoading || isRegistered.value) return;

  // If one of the fields is empty, show a toast message
  if (!studentId.value || !firstName.value || !lastName.value || !email.value ||
      !tsize.value || !campus.value || !course.value || !yearLevel.value) {
      toast.error("Please fill up all fields.");
      return;
  }

  const id = dialog.open("Confirm registration", `
    <div class="grid grid-cols-2 gap-y-1">
      <div>Student ID:</div>
      <div>${studentId.value}</div>
      <div>First name:</div>
      <div>${firstName.value}</div>
      <div>Last name:</div>
      <div>${lastName.value}</div>
      <div>Email:</div>
      <div>${email.value}</div>
      <div>T-shirt size:</div>
      <div>${tshirtSizes.value.find(size => size.id === tsize.value)?.name}</div>
      <div>Campus:</div>
      <div>${campuses.value.find(c => c.id === campus.value)?.campus_name}</div>
      <div>Course:</div>
      <div>${courses.value.find(c => c.id === course.value)?.course_name}</div>
      <div>Year level:</div>
      <div>${mapYearLevel(yearLevel.value)}</div>
    </div>
  `, {
    text: "Register",
    click() {
      dialog.close(id);
      requestRegister();
    }
  });
}

function clearFields() {
  studentId.value = "";
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  tsize.value = undefined;
  campus.value = undefined;
  course.value = undefined;
  yearLevel.value = undefined;
  isRegistered.value = false;
  key.value++;
}

function mapYearLevel(year: number) {
  switch (year) {
    case 1:
      return "1st year";
    case 2:
      return "2nd year";
    case 3:
      return "3rd year";
    case 4:
      return "4th year";
    default:
      return "N/A";
  }
}
</script>

<style lang="scss">
md-outlined-select, md-outlined-text-field {
  --_outline-color: var(--md-sys-color-outline);
  --_text-field-outline-color: var(--md-sys-color-outline);
  --_text-field-container-shape: 8px;
  --_container-shape: 8px;
}

html .ictcongress {
  md-outlined-select {
    --md-menu-container-color: var(--md-sys-color-surface-variant);
  }
}

html.dark .ictcongress {
  md-outlined-select {
    --md-menu-container-color: var(--md-sys-color-surface-container);
  }
}
</style>