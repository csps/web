<template>
  <div>
    <div class="flex flex-col items-center justify-center pb-5">
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
        <md-outlined-text-field v-model.trim="email" type="email" label="Email"
          supportingText="This is where we will send to you your tatak form.">
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
              {{ year }}
            </md-select-option>
          </md-outlined-select>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <md-filled-button @click="register">
        Submit
      </md-filled-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import { isEmail } from '~/utils/string';
import { useDialog } from '~/store';
import { icon } from '~/utils/icon';

const studentId = ref("");
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const college = ref("as");
const program = ref();
const yearLevel = ref();

const courses = ref([]);
const dialog = useDialog();

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