<template>
  <div class="container flex flex-col items-center justify-center mx-auto px-6">
    <div class="my-10 text-center">
      <h4 class="mb-2 text-2xl font-bold">ICT Congress 2024 - Registration</h4>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut.</p>
    </div>

    <div class="flex flex-col gap-5 w-full sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-2/5 2xl:w-1/3 font-reset">
      <!-- Student ID -->
      <md-outlined-text-field v-model="studentId" type="number" label="Student ID">
        <md-icon slot="leading-icon" v-html="icon('badge', true)" />
      </md-outlined-text-field>

      <!-- First and Last name -->
      <div class="flex gap-5">
        <md-outlined-text-field v-model="firstName" label="First name">
          <md-icon slot="leading-icon" v-html="icon('person', true)" />
        </md-outlined-text-field> 
        <md-outlined-text-field v-model="lastName" label="Last name">
          <md-icon slot="leading-icon" v-html="icon('person', true)" />
        </md-outlined-text-field> 
      </div>

      <!-- Email -->
      <md-outlined-text-field v-model="email" type="email" label="Email">
        <md-icon slot="leading-icon" v-html="icon('mail', true)" />
      </md-outlined-text-field>

      <!-- T-shirt size and campus -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <md-outlined-select v-model="tsize" label="T-shirt size">
          <md-icon slot="leading-icon" v-html="icon('bar_chart', true)" />
          <md-select-option v-for="size in tshirtSizes" :key="size.id" :value="size.id">
            {{ size.name }}
          </md-select-option> 
        </md-outlined-select>
        <md-outlined-select v-model="campus" label="Campus">
          <md-icon slot="leading-icon" v-html="icon('location_city', true)" />
          <md-select-option v-for="campus in campuses" :key="campus.id" :value="campus.id">
            {{ campus.campus_name }}
          </md-select-option>
        </md-outlined-select>
      </div>

      <!-- Course and Year level -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <md-outlined-select v-model="course" label="Course">
          <md-icon slot="leading-icon" v-html="icon('school', true)" />
          <md-select-option v-for="course in courses" :key="course.id" :value="course.id">
            {{ course.course_name }}
          </md-select-option>
        </md-outlined-select>
        <md-outlined-select v-model="yearLevel" label="Year level">
          <md-icon slot="leading-icon" v-html="icon('school', true)" />
          <md-select-option v-for="year in 4" :key="year" :value="year">
            {{ mapYearLevel(year) }}
          </md-select-option>
        </md-outlined-select>
      </div>

      <!-- Register -->
      <div class="flex justify-end">
        <md-filled-button>Register</md-filled-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { icon } from "~/utils/icon";
import { useStore } from "~/store";

import "@material/web/icon/icon";
import "@material/web/button/filled-button";
import "@material/web/textfield/outlined-text-field";
import "@material/web/select/outlined-select";
import "@material/web/select/select-option";
import { Endpoints, makeRequest } from "~/network/request";
import { toast } from "vue3-toastify";

const studentId = ref("");
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const tsize = ref("");
const campus = ref("");
const course = ref("");
const yearLevel = ref("");

const store = useStore();
const courses = ref<ICTCourse[]>([]);
const tshirtSizes = ref<ICTSize[]>([]);
const campuses = ref<ICTCampus[]>([]);

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

<style lang="scss" scoped>
md-outlined-select {
  --md-menu-container-color: var(--md-sys-color-surface-variant);
}
</style>