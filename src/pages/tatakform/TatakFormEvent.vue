<template>
    <div class="container mx-auto p-6 w-full lg:w-full xl:w-3/4 3xl:w-3/5 h-full flex-col flex justify-center text-on-surface-variant">
        <md-icon-button v-if="stepCount === 2" @click="stepCount = 1">
            <md-icon v-html="icon('arrow_back')" />
        </md-icon-button>
        <div class="text-center">
            <h2 class="mb-2 text-2xl font-bold">
            {University Days}
            </h2>
            <h5 class="">
            {From March 4, 2024 to March 9, 2024}
            </h5>
        </div>
        <div v-if="stepCount === 1" class="text-center">
            <div class="my-10 text-center">
                <h3 class="mb-2 text-2xl font-bold">
                    Step 1: Choose your character
                </h3>
            </div>

            <div class="flex gap-8 justify-center py-5">
                <div v-for="college in colleges_img_path1" @click="stepCount = 2" class="college flex -translate-y-1 px-6 w-full 3xl:w-3/5 !overflow-visible">
                <div class="sm:w-24 sm:h-24 lg:w-48 lg:h-48 py-2 my-4 foreground object">
                    <md-ripple />
                        <VImage
                            class="rounded-xl"
                            :src="college"
                        />
                    </div>
                </div>
            </div>

            <div class="flex gap-8 justify-center">
                <div v-for="college in colleges_img_path2" class="college flex -translate-y-1 px-6 w-full 3xl:w-3/5 !overflow-visible">
                <div class="sm:w-24 sm:h-24 lg:w-48 lg:h-48 py-2 my-4 foreground object">
                    <md-ripple />
                        <VImage
                            class="rounded-xl"
                            :src="college"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div v-if="stepCount === 2" class="flex flex-col items-center justify-center pb-5">
            <div class="my-10 text-center">
                <h4 class="mb-2 text-2xl font-bold">
                    Step 2: Fill out the unnecessary details
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
            <md-outlined-text-field type="number" v-model.trim="college" label="College of Computer Studies" min="0" disabled="true">
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
import { ref } from 'vue';
import { isEmail } from "~/utils/string";
import { useStore, useDialog } from "~/store";

import "@material/web/iconbutton/icon-button"
import "@material/web/button/filled-button";
import "@material/web/icon/icon";
import "@material/web/button/filled-button";
import "@material/web/button/filled-tonal-button";
import "@material/web/textfield/outlined-text-field";
import "@material/web/select/outlined-select";
import "@material/web/select/select-option";

const dialog = useDialog();


const colleges_img_path1 = [
    "/src/assets/img/tatakform/colleges/CAS.png",
    "/src/assets/img/tatakform/colleges/CBA.png",
    "/src/assets/img/tatakform/colleges/CCS.png",
    "/src/assets/img/tatakform/colleges/HM.png",
]

const colleges_img_path2 = [
    "/src/assets/img/tatakform/colleges/COE.png",
    "/src/assets/img/tatakform/colleges/CTE.png",
    "/src/assets/img/tatakform/colleges/SW.png",
    "/src/assets/img/tatakform/colleges/CCJ.png",
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