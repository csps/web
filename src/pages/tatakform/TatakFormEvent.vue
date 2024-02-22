<template>
    <div class="container mx-auto p-6 w-full lg:w-full xl:w-3/4 3xl:w-3/5 h-full flex-col flex justify-center text-on-surface-variant">
        <md-icon-button v-if="stepCount === 2" @click="stepCount = 1">
            <md-icon v-html="icon('arrow_back')" />
        </md-icon-button>
        <div class="text-center">
            <h2 class="mb-2 text-2xl font-bold">
            University Days
            </h2>
            <h5 class="">
            From March 4, 2024 to March 9, 2024
            </h5>
        </div>
        <div v-if="stepCount === 1" class="text-center">
            <div class="mt-3 mb-1 text-center">
                <h3 class="mb-2 text-2xl font-bold">
                    Step 1: Choose your college
                </h3>
            </div>

            <div class="flex gap-8 justify-center py-2 grid-cols-2 lg:grid-cols-4 grid">
                <div v-for="college in colleges_image_path1" @click="goToNextStep(college.college_name)" class="college flex mx-auto -translate-y-1 px-6 w-full 3xl:w-3/5 !overflow-visible">
                    <div class="w-24 h-24 sm:w-36 sm:h-36 py-2 my-4 foreground object">
                      <md-ripple />
                        <VImage
                            class="rounded-xl"
                            :src="college.img_path"
                            :alt="college.college_name"
                        />
                    </div>
                </div>
            </div>

           
        </div>

        <div v-if="stepCount === 2" class="flex flex-col items-center justify-center pb-5">
            <div class="mt-3 mb-2 text-center">
                <h4 class="mb-2 text-2xl font-bold">
                    Step 2: Fill out the necessary details
                </h4>
            </div>
            <div class="flex flex-col justify-center gap-5 w-full sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-2/5 2xl:w-1/3 font-reset">
            <!-- Student ID -->
            <md-outlined-text-field v-model.trim="studentId" type="number" label="Student ID" min="0">
                <md-icon slot="leading-icon" v-html="icon('badge', true)" />
            </md-outlined-text-field>

            <!-- First and Last name -->
            <div class="flex gap-5">
                <md-outlined-text-field v-model.trim="firstName" label="First name">
                <md-icon slot="leading-icon" v-html="icon('person', true)" />
                </md-outlined-text-field> 
                <md-outlined-text-field v-model.trim="lastName" label="Last name">
                <md-icon slot="leading-icon" v-html="icon('person', true)" />
                </md-outlined-text-field> 
            </div>

            <!-- Email -->
            <md-outlined-text-field v-model.trim="email" type="email" label="Email" supportingText="This is where we will send to you your tatak form.">
                <md-icon slot="leading-icon" v-html="icon('mail', true)" />
            </md-outlined-text-field>
            
            <!-- College -->
            <md-outlined-text-field v-model.trim="college" :label="college" min="0" disabled="true">
                <md-icon slot="leading-icon" v-html="icon('badge', true)" />
            </md-outlined-text-field>

            <!-- Course and Year level -->
            <div class="grid grid-cols-1 md:grid-cols-1 gap-5">
                <md-outlined-select v-model="program" label="Program">
                <md-icon slot="leading-icon" v-html="icon('school', true)" />
                <md-select-option v-for="course in courses" :value="course">
                    {{ course }}
                </md-select-option>
                </md-outlined-select>
                <md-outlined-select v-model="yearLevel" label="Year level">
                <md-icon slot="leading-icon" v-html="icon('school', true)" />
                <md-select-option v-for="year in 4" :key="year" :value="year">
                    {{year}}
                </md-select-option>
                </md-outlined-select>
            </div>

            </div>
        </div>
        <div class="flex justify-center" v-if="stepCount === 2">
            <md-filled-button @click="register">
                Submit
            </md-filled-button>
        </div>
    </div>
</template>

<script setup>
import VImage from '../../components/VImage.vue';
import { toast } from "vue3-toastify";
import { icon } from '~/utils/icon';
import { ref, onMounted } from 'vue';
import { isEmail } from "~/utils/string";
import { useStore, useDialog } from "~/store";

import anime from 'animejs/lib/anime.es.js';

import "@material/web/iconbutton/icon-button"
import "@material/web/button/filled-button";
import "@material/web/icon/icon";
import "@material/web/button/filled-button";
import "@material/web/button/filled-tonal-button";
import "@material/web/textfield/outlined-text-field";
import "@material/web/select/outlined-select";
import "@material/web/select/select-option";

const dialog = useDialog();

const colleges_image_path1 = [
    {
        college_name: "College of Arts and Sciences",
        img_path: "/src/assets/img/tatakform/colleges/CAS.png"
    },
    {
        college_name: "College of Business Accountancy",
        img_path: "/src/assets/img/tatakform/colleges/CBA.png"
    },
    {
        college_name: "College of Computer Studies",
        img_path: "/src/assets/img/tatakform/colleges/CCS.png"
    },
    {
        college_name: "College of Hotel Management",
        img_path: "/src/assets/img/tatakform/colleges/HM.png"
    },
    {
        college_name: "College of Engineering",
        img_path: "/src/assets/img/tatakform/colleges/COE.png"
    },
    {
        college_name: "College of Teacher Education",
        img_path: "/src/assets/img/tatakform/colleges/CTE.png"
    },
    {
        college_name: "College of Social Works",
        img_path: "/src/assets/img/tatakform/colleges/SW.png"
    },
    {
        college_name: "College of Criminal Justice",
        img_path: "/src/assets/img/tatakform/colleges/CCJ.png"
    },
]


const courses = ['AB Psychology', 'BS Computer Science']

const stepCount = ref(1)

const studentId = ref("");
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const college = ref("as");
const program = ref();
const yearLevel = ref();

onMounted(() => {
    const tl = anime.timeline();
    const logoRef = document.getElementsByClassName("college")

    tl.add({
    targets: logoRef,
    translateY: [-20, 0],
    scale: [0.5, 1],
    opacity: [0, 1],
    duration: 2000,
    easing: 'easeOutElastic(1, 0.8)',
    complete() {
      // Loop animation
      anime({
        targets: logoRef,
        translateY: 15,
        duration: 2000,
        loop: true,
        direction: 'alternate',
        easing: 'linear',
      });

    }
  });
})

function goToNextStep(collegeName){
    college.value = collegeName
    stepCount.value++
}

function register() {    
  // If one of the fields is empty, show a toast message
  if (!studentId.value || !firstName.value || !lastName.value || !email.value ||
      !college.value || !program.value || !yearLevel.value) {
      toast.error("Please fill up all fields.");
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
      <div>College:</div>
      <div>${college.value}</div>
      <div>Program:</div>
      <div>${program.value}</div>
      <div>Year level:</div>
      <div>${yearLevel.value}</div>
    </div>
  `, {
    text: "Proceed",
    click() {
      dialog.close(id);
      
      id = dialog.open("Note", `
        <p>QR code will be given to your email and will be used during event.</p>
      `, {
        text: "I understand, proceed",
        click() {
          dialog.close(id);
        }
      }, {
        text: "Cancel",
        click: () => dialog.close(id)
      });
    }
  });
}
</script>


<style lang="scss" scoped>
.college {
  @apply flex flex-col justify-between relative bg-surface-container-low rounded-xl w-min;
  animation: glow 1.5s ease-in-out infinite alternate;

  .foreground {
    @apply bg-surface-container rounded-xl;
  }

  .content {
    @apply px-5 font-medium rounded-2xl;

    h4 {
      @apply text-on-surface-variant mb-1;
    }
  }
}
</style>
