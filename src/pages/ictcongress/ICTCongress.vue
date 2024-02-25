<template>
  <div class="container flex flex-col items-center justify-center mx-auto px-6">
    <VMouse class="invisible sm:visible absolute bottom-[5%] left-1/2 -translate-x-1/2" />
    <section class="first pb-32 flex items-center z-0 !overflow-visible">
      <div class="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 w-full">
        <div class="flex justify-center items-center" data-sal="zoom-in" data-sal-repeat>
          <div class="flex justify-center dark:bg-surface rounded-3xl" id="graphic">
            <div class="absolute gradient rounded-3xl" />
            <img :src="graphic" class="w-2/3 lg:w-3/4 xl:w-1/2 select-none" alt="ICT Congress Graphics" />
          </div>
        </div>
        <div class="text-justify space-y-5 z-[2]">
          <div id="description" data-sal="slide-right" data-sal-repeat>
            <h3 class="text-base lg:text-xl font-bold mb-3 ml-6">10ᵗʰ <span class="text-primary">UC CCS ICT Congress</span></h3>
            <p class="bg-surface-container px-6 py-4 rounded-lg leading-6 text-on-surface-variant">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div class="flex justify-end">
            <md-filled-button data-sal="slide-left" data-sal-repeat @click="onRegisterClick">
              Register now!
              <md-icon slot="icon" v-html="icon('campaign', true)" />
            </md-filled-button>
          </div>
        </div>
      </div>
    </section>
    <section class="flex flex-col items-center justify-center h-[100dvh]">
      <div class="flex flex-col space-y-5 w-full sm:w-3/4 lg:w-3/4 2xl:w-4/5 font-reset bg-surface-container p-6 lg:p-8 rounded-2xl">
        <div class="text-center" data-sal="slide-right" data-sal-repeat>
          <h4 class="mb-1 text-lg lg:text-2xl font-bold"><span class="text-primary">ICT Congress 2024</span> - Registration</h4>
        </div>
        <!-- Student ID -->
        <md-filled-text-field
          data-sal="zoom-in"
          data-sal-repeat
          v-model.trim="studentId"
          maxLength="8"
          type="number"
          label="Student ID"
          min="0"
          oninput="this.value = this.value.slice(0, 8)"
          :disabled="store.isLoading || isRegistered"
        >
          <md-icon slot="leading-icon" v-html="icon('badge', true)" />
        </md-filled-text-field>
    
        <!-- First and Last name -->
        <div class="flex gap-5 !mt-1">
          <md-filled-text-field data-sal="slide-right" data-sal-repeat v-model.trim="firstName" label="First name" :disabled="store.isLoading || isRegistered">
            <md-icon slot="leading-icon" v-html="icon('person', true)" />
          </md-filled-text-field> 
          <md-filled-text-field data-sal="slide-left" data-sal-repeat v-model.trim="lastName" label="Last name" :disabled="store.isLoading || isRegistered">
            <md-icon slot="leading-icon" v-html="icon('person', true)" />
          </md-filled-text-field> 
        </div>
    
        <!-- Email -->
        <md-filled-text-field
          data-sal="zoom-in"
          data-sal-repeat
          v-model.trim="email"
          type="email"
          label="Email"
          :disabled="store.isLoading || isRegistered"
          supportingText="Make sure to use your valid email address."
        >
          <md-icon slot="leading-icon" v-html="icon('mail', true)" />
        </md-filled-text-field>
    
        <!-- T-shirt size and campus -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 !mt-3">
          <md-filled-select data-sal="slide-right" data-sal-repeat v-model="tsize" label="T-shirt size" :disabled="store.isLoading || isRegistered">
            <md-icon slot="leading-icon" v-html="icon('bar_chart', true)" />
            <md-select-option v-for="size in tshirtSizes" :key="size.id" :value="size.id">
              {{ size.name }}
            </md-select-option> 
          </md-filled-select>
          <md-filled-select data-sal="slide-left" data-sal-repeat v-model="campus" label="Campus" :disabled="store.isLoading || isRegistered">
            <md-icon slot="leading-icon" v-html="icon('location_city', true)" />
            <md-select-option v-for="campus in campuses" :key="campus.id" :value="campus.id">
              {{ campus.campus_name }}
            </md-select-option>
          </md-filled-select>
        </div>
    
        <!-- Course and Year level -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <md-filled-select data-sal="slide-right" data-sal-repeat v-model="course" label="Course" :disabled="store.isLoading || isRegistered">
            <md-icon slot="leading-icon" v-html="icon('school', true)" />
            <md-select-option v-for="course in courses" :key="course.id" :value="course.id">
              {{ course.course_name }}
            </md-select-option>
          </md-filled-select>
          <md-filled-select data-sal="slide-left" data-sal-repeat v-model="yearLevel" label="Year level" :disabled="store.isLoading || isRegistered">
            <md-icon slot="leading-icon" v-html="icon('school', true)" />
            <md-select-option v-for="year in 4" :key="year" :value="year">
              {{ mapYearLevel(year) }}
            </md-select-option>
          </md-filled-select>
        </div>
    
        <div class="flex justify-center">
          <md-filled-text-field
            label="Discount code"
            v-model.trim="discountCode"
            :disabled="store.isLoading || isRegistered"
            maxLength="16"
            class="w-full"
            supportingText="This is an optional field."
            data-sal="zoom-in" data-sal-repeat
          >
            <md-icon slot="leading-icon" v-html="icon('verified', true)" />
          </md-filled-text-field>
        </div>
    
        <!-- Register -->
        <div class="flex justify-end gap-3" data-sal="zoom-in" data-sal-repeat>
          <md-filled-tonal-button v-if="isRegistered" @click="clearFields">Reset fields</md-filled-tonal-button>
          <md-filled-button @click="register" :disabled="isRegistered || store.isLoading">
            {{ store.isLoading ? "Registering..." : isRegistered ? 'Registered' : "Confirm details" }}
          </md-filled-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { icon } from "~/utils/icon";
import { useStore, useDialog } from "~/store";
import { Endpoints, makeRequest } from "~/network/request";
import { toast } from "vue3-toastify";
import { isEmail } from "~/utils/string";

import "@material/web/icon/icon";
import "@material/web/button/filled-button";
import "@material/web/button/filled-tonal-button";
import "@material/web/textfield/filled-text-field";
import "@material/web/select/filled-select";
import "@material/web/select/select-option";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import graphic from "~/assets/img/ictcongress2024.png";
import VMouse from "~/components/VMouse.vue";
import VanillaTilt from "vanilla-tilt";
import sal from "sal.js";

const studentId = ref("");
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const tsize = ref();
const campus = ref();
const course = ref();
const yearLevel = ref();
const discountCode = ref("");

const store = useStore();
const dialog = useDialog();
const courses = ref<ICTCourse[]>([]);
const tshirtSizes = ref<ICTShirtSize[]>([]);
const campuses = ref<ICTCampus[]>([]);
const isRegistered = ref(false);

type ICTConfig = {
  courses: ICTCourse[];
  tshirt_sizes: ICTShirtSize[];
  campuses: ICTCampus[];
};

onMounted(() => {
  getConfig();

  // Bind fancybox
  setTimeout(() => {
    // Bind tilting effect
    for (const image of document.querySelectorAll("#graphic")) {
      VanillaTilt.init(image as HTMLElement, {
        reverse: true,
        glare: true,
        "max-glare": 0.4,
        "glare-prerender": false,
        gyroscope: true,
        gyroscopeMinAngleX: -45,
        gyroscopeMaxAngleX: 45,
        gyroscopeMinAngleY: -45,
        gyroscopeMaxAngleY: 45,
        reset: true,
        perspective: 500
      });
    }

    // Start sal.js animation
    sal();
  }, 0);
});

function onRegisterClick() {
  window.scrollTo(0, window.innerHeight);
}

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
    discount_code: discountCode.value,
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

  // Slice student ID
  studentId.value = studentId.value.toString().slice(0, 8);

  // If one of the fields is empty, show a toast message
  if (!studentId.value || !firstName.value || !lastName.value || !email.value ||
      !tsize.value || !campus.value || !course.value || !yearLevel.value) {
      toast.error("Please fill up all fields.");
      return;
  }

  if (studentId.value.toString().length !== 8) {
    toast.error("Student ID must be 8 characters long.");
    return;
  }

  if (!isEmail(email.value)) {
    toast.error("Invalid email format.");
    return;
  }

  let id = dialog.open("Confirm Details", `
    <div class="grid grid-cols-2 gap-y-1 mt-3">
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
      <div>Discount code:</div>
      <div>${discountCode.value.length > 0 ? discountCode.value : 'N/A'}</div>
    </div>
  `, {
    text: "Proceed",
    click() {
      dialog.close(id);
      
      id = dialog.open("Note", `
        <p>Orders that are not paid as soon as possible will be withdrawn by the admins.</p>
      `, {
        text: "I understand, proceed",
        click() {
          dialog.close(id);
          requestRegister();
        }
      }, {
        text: "Cancel",
        click: () => dialog.close(id)
      });
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

  for (const select of document.querySelectorAll("md-filled-select")) {
    select.reset();
  }
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
md-filled-select, md-filled-text-field {
  --_outline-color: var(--md-sys-color-outline);
  --_text-field-container-shape: 8px;
  --_container-shape: 8px;
  --_active-indicator-color: var(--md-sys-color-outline-variant);
  --_text-field-active-indicator-color: var(--md-sys-color-outline-variant);
}

.glow {
  animation: glow 1.5s ease-in-out infinite alternate;
}

section.first {
  height: calc(100dvh - 64px);
}
</style>