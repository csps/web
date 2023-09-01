<template>
  <md-dialog
    :open="isDialogOpen"
    @close="close"
    :scrim-click-action="isLoading ? '' : 'close'"
    :escape-key-action="isLoading ? '' : 'close'"
  >
    <div slot="headline">{{ student ? 'Update' : 'Add' }} Student</div>
    <div slot="content" class="space-y-5">
      <div class="grid grid-cols-2 gap-5">
        <md-filled-text-field
          class="w-full"
          label="Student ID"
          type="number"
          v-model.trim="studentID"
          :disabled="isLoading"
          @keydown.enter="submit"
        >
          <md-icon slot="leadingicon" v-html="icon('badge', true)" />
        </md-filled-text-field>

        <md-filled-select
          class="w-full"
          label="Year"
          v-model="year"
          :disabled="isLoading"
          @keydown.enter="submit"
          quick
        >
          <md-icon slot="leadingicon" v-html="icon('school', true)" />
          <md-select-option :value="1" headline="1st year" />
          <md-select-option :value="2" headline="2nd year" />
          <md-select-option :value="3" headline="3rd year" />
          <md-select-option :value="4" headline="4th year" />
        </md-filled-select>

        <md-filled-text-field
          class="w-full"
          label="First Name"
          v-model.trim="firstName"
          :disabled="isLoading"
          @keydown.enter="submit"
        >
          <md-icon slot="leadingicon" v-html="icon('account_circle', true)" />
        </md-filled-text-field> 
  
        <md-filled-text-field
          class="w-full"
          label="Last Name"
          v-model.trim="lastName"
          :disabled="isLoading"
          @keydown.enter="submit"
        >
          <md-icon slot="leadingicon" v-html="icon('account_circle', true)" />
        </md-filled-text-field>

      </div>

      <md-filled-text-field
        class="w-full"
        label="Email"
        type="email"
        v-model.trim="email"
        :disabled="isLoading"
        @keydown.enter="submit"
      >
        <md-icon slot="leadingicon" v-html="icon('mail', true)" />
      </md-filled-text-field>

      <md-filled-text-field
        class="w-full"
        label="Password"
        type="password"
        supporting-text="Password will be auto-generated and will be sent to the student's email"
        disabled
      >
        <md-icon slot="leadingicon" v-html="icon('lock', true)" />
      </md-filled-text-field>

    </div>
    <div class="space-x-1" slot="actions">
      <md-text-button @click="close" :disabled="isLoading">Cancel</md-text-button>
      <md-text-button @click="submit" :disabled="isLoading" autofocus>
        {{ student ? (isLoading ? "Updating..." : "Update") : (isLoading ? 'Adding...' : 'Add') }}
      </md-text-button>
    </div>
  </md-dialog>
</template>

<script lang="ts" setup>
import "@material/web/dialog/dialog";
import "@material/web/textfield/filled-text-field";
import "@material/web/select/filled-select";
import "@material/web/select/select-option";

import { ref, computed, watch } from "vue";
import { toast } from "vue3-toastify";
import { icon } from "~/utils/icon";
import { useStore } from "~/store";
import { Endpoints, makeRequest } from "~/network/request";
import { Env } from "~/config";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps<{
  modelValue: boolean;
  student?: StudentModel
}>();

const store = useStore();
const isLoading = ref(false);
const isDialogOpen = computed(() => props.modelValue);

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const year = ref(1);
const studentID = ref("");

watch(isDialogOpen, (value) => {
  if (value) {
    firstName.value = props.student?.first_name || "";
    lastName.value = props.student?.last_name || "";
    email.value = props.student?.email_address || "";
    year.value = props.student?.year_level ? parseInt(props.student.year_level) : 1;
    studentID.value = props.student?.student_id || "";
  }
});

/**
 * Send the email
 */
function submit() {
  // If student id is empty
  if (!studentID.value) {
    toast.info("Empty student ID");
    return;
  }

  // If year is empty
  if (!year.value) {
    toast.info("Empty year");
    return;
  }

  // If first name is empty
  if (!firstName.value) {
    toast.info("Empty first name");
    return;
  }

  // If last name is empty
  if (!lastName.value) {
    toast.info("Empty last name");
    return;
  }

  // If email is empty
  if (!email.value) {
    toast.info("Empty email");
    return;
  }

  // If email is invalid
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    toast.info("Invalid email");
    return;
  }

  // If already loading, return
  if (isLoading.value) return;
  isLoading.value = true;
  
  // Send the request
  makeRequest(props.student ? "PUT" : "POST", Endpoints.Students, { 
    student_id: studentID.value,
    year_level: year.value,
    first_name: firstName.value,
    last_name: lastName.value,
    email_address: email.value,
  }, response => {
    // Set loading to false
    isLoading.value = false;

    // If success
    if (response.success) {
      store.isLoading = true;
      toast.success(response.message);

      makeRequest<any>("GET", Endpoints.Env, null, response => {
        store.isLoading = false;

        if (response.success) {
          for (const key in response.data) {
            Env[key] = response.data[key];
          }
        }
  
        toast.error(response.message);
        close();
      });

      return;
    }

    // Otherwise, show error
    toast.error(response.message);
  });
}

/**
 * Close the dialog
 */
function close() {
  // TODO: add confirmation dialog
  emit("update:modelValue", false);
}
</script>