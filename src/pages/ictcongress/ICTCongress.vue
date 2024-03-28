<template>
  <div class="container flex flex-col items-center justify-center mx-auto px-6 relative overlay">
    <VMouse class="invisible sm:visible absolute bottom-[5%] left-1/2 -translate-x-1/2" />
    <section class="first pb-32 flex items-center z-0 !overflow-visible">
      <div class="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 w-full">
        <div class="flex justify-center items-center" data-sal="zoom-in" data-sal-repeat>
          <div class="flex justify-center rounded-3xl graphic">
            <div class="absolute gradient rounded-3xl" />
            <img :src="graphic" class="w-2/3 md:w-1/2 lg:w-11/12 xl:w-3/4 2xl:w-4/5 3xl:w-3/5 select-none float-anim" alt="ICT Congress Graphics" />
          </div>
        </div>
        <div class="text-justify space-y-5 z-[2]">
          <div data-sal="slide-right" data-sal-repeat>
            <h3 class="text-base lg:text-xl font-bold mb-3 ml-6">10ᵗʰ <span class="text-primary">UC CCS ICT Congress</span></h3>
            <p ref="intro" class="bg-surface-container px-6 py-4 rounded-lg leading-6 text-on-surface-variant" />
          </div>
          <div class="flex justify-end">
            <md-filled-button :disabled="!ict.isAcceptingRegistrations" data-sal="slide-left" data-sal-repeat @click="onRegisterClick">
              {{ !ict.isAcceptingRegistrations ? 'Registration is closed' : 'Register now!'}}
              <md-icon slot="icon" v-html="icon('campaign', true)" />
            </md-filled-button>
          </div>
        </div>
      </div>
    </section>
    <section class="flex flex-col items-center justify-center min-h-[100dvh]">
      <Transition>
      
        <div v-if="ict.isAcceptingRegistrations" class="flex flex-col space-y-5 w-full sm:w-3/4 lg:w-3/4 2xl:w-4/5 font-reset bg-surface-container p-6 lg:p-8 rounded-2xl">
          <div class="text-center" data-sal="slide-right" data-sal-repeat>
            <h4 class="mb-1 text-lg lg:text-2xl font-bold"><span class="text-primary">ICT Congress 2024</span> - Registration</h4>
          </div>
          <!-- Student ID -->
          <md-filled-text-field
            data-sal="zoom-in"
            data-sal-repeat
            v-model.trim="studentId"
            maxLength="8"
            type="text"
            inputmode="numeric"
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
              :value="discountCode"
              :disabled="store.isLoading || isRegistered"
              maxLength="16"
              class="w-full"
              supportingText="Discount code applied based on campus and date. (read-only field)"
              readonly
              data-sal="zoom-in" data-sal-repeat
              title="Read-only field."
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
        <div v-else>
          <div class="bg-error text-on-error rounded-[28px] p-6">
            Registration is currently closed.
          </div>
        </div>
      </Transition>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { icon } from "~/utils/icon";
import { useStore, useDialog, useIctStore } from "~/store";
import { Endpoints, makeRequest } from "~/network/request";
import { toast } from "vue3-toastify";
import { isEmail } from "~/utils/string";
import { mapYearLevel } from "~/utils/page";

import "@material/web/icon/icon";
import "@material/web/button/filled-button";
import "@material/web/button/filled-tonal-button";
import "@material/web/textfield/filled-text-field";
import "@material/web/select/filled-select";
import "@material/web/select/select-option";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import graphic from "~/assets/img/ictcongress2024.png";
import VMouse from "~/components/VMouse.vue";
import Typed from "typed.js";
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

const ict = useIctStore();
const store = useStore();
const dialog = useDialog();
const courses = ref<ICTCourse[]>([]);
const tshirtSizes = ref<ICTShirtSize[]>([]);
const campuses = ref<ICTCampus[]>([]);
const discountCodes = ref<ICTDiscountCode[]>([]);
const isRegistered = ref(false);
const intro = ref();

const message = `
  Get ready for an exciting journey at the 10th UC CCS ICT Congress 2024!^1000
  It's the perfect opportunity for you to learn from our industry pioneers,^500 thought leaders,^500 and innovators,^500 and get the latest insights into the most cutting-edge technologies,^500 emerging trends,^500 and innovative strategies driving the ICT sector forward.^1000
  You'll also have the chance to witness the exceptional skills and accomplishments of students from various campuses.^500 So, let's come together and pave the way for a brighter future, where possibilities are limitless, and the potential for progress knows no bounds.
  We can't wait to see you there!
`;

type ICTConfig = {
  courses: ICTCourse[];
  tshirt_sizes: ICTShirtSize[];
  campuses: ICTCampus[];
  discount_codes: ICTDiscountCode[];
};

let instance: Typed | undefined;

onMounted(() => {
  getConfig();

  // Bind fancybox
  setTimeout(() => {
    // Bind tilting effect
    for (const image of document.querySelectorAll(".graphic")) {
      VanillaTilt.init(image as HTMLElement, {
        reverse: true,
        reset: true,
        perspective: 500
      });
    }

    // Start sal.js animation
    sal();
    // Start typed.js
    startTyped();
  }, 0);
});

watch(campus, (v) => {
  if (v) {
    // Find the code ...
    discountCode.value = discountCodes.value.find(
      // with assigned campus
      dc => dc.campus_id === v &&
      // and date is earlier than the expiration datetime
      new Date() < new Date(dc.expiration)
    )?.code || "";

    return;
  }

  discountCode.value = "";
});

function onRegisterClick() {
  if (!ict.isAcceptingRegistrations) {
    toast.error("Registration is currently closed.");
    return;
  }

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
      discountCodes.value = response.data.discount_codes;
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

      const id = dialog.open({
        title: "Success",
        message: response.message,
        ok: {
          text: "Got it!",
          click: () => dialog.close(id)
        },
        cancel: null
      });
      
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

  // Check student ID's length
  if (studentId.value.toString().length !== 8) {
    toast.error("Student ID must be 8 characters long.");
    return;
  }

  // Check student ID's validity
  if (!/^\d+$/.test(studentId.value)) {
    toast.error("Student ID must contain only numbers.");
    return;
  }

  if (!isEmail(email.value)) {
    toast.error("Invalid email format.");
    return;
  }

  let id = dialog.open({
    title: "Confirm Details",
    message: `
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
        <div>Price:</div>
        <div>₱ ${discountCodes.value.find(dc => dc.code === discountCode.value)?.price || 0}.00</div>
      </div>
    `,
    ok: {
      text: "Proceed",
      click() {
        dialog.close(id);
        
        id = dialog.open({
          title: "Note:",
          message: `
            <p>Orders that are not paid as soon as possible will be withdrawn by the admins.</p>
          `,
          ok: {
            text: "I understand, proceed",
            click() {
              dialog.close(id);
              requestRegister();
            }
          },
          cancel: {
            text: "Cancel",
            click: () => dialog.close(id)
          }
        });
      }
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
  discountCode.value = "";
  isRegistered.value = false;

  for (const select of document.querySelectorAll("md-filled-select")) {
    select.reset();
  }
}

function startTyped() {
  if (instance) {
    instance.destroy();
  }

  instance = new Typed(intro.value, {
    strings: [ message ],
    typeSpeed: 15,
    showCursor: false,
  });
}


</script>

<style lang="scss" scoped>
.glow {
  animation: glow 2s ease-in-out infinite alternate;
}

section {
  min-height: calc(100dvh - 64px);
}

.graphic {
  transform-style: preserve-3d;
  transform: perspective(1000px);
}

.graphic-front {
  transform: translateX(-20px) translateZ(30px);
}

.overlay {
  @apply overflow-hidden;
}

.overlay::before {
  content: ' ';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-image: url('~/assets/img/ictcongress2024.png');
  background-size: cover;
  background-position: center;

  @apply opacity-[0.03];
}
</style>