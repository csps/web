<template>
  <div class="container mx-auto p-6 w-full lg:w-full 2xl:w-4/5 3xl:w-3/5 h-full">
    <div class v-if="store.checkoutDetails">
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div class="flex flex-col gap-5 flex-grow">
          <div>
            <h3 class="title-large font-medium text-on-surface-variant mb-0.5">Student information</h3>
            <p class="label-medium text-on-surface-variant">
              {{ store.isLoggedIn ? Env.checkout_student_details_logged_info : Env.checkout_student_details_info }}
            </p>
          </div>
  
          <div class="bg-surface-container p-10 rounded-xl">
            <md-filled-text-field :disabled="isPlacingOrder" v-model="studentId" :readonly="store.isLoggedIn" maxlength="8" label="Student ID">
              <md-icon slot="leading-icon" v-html="icon('badge', true)"  />
            </md-filled-text-field>
            <div class="flex flex-col gap-6 flex-grow mt-2">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <md-filled-text-field :disabled="isPlacingOrder" v-model="firstName" :readonly="store.isLoggedIn" label="First name">
                  <md-icon slot="leading-icon" v-html="icon('person', true)"  />
                </md-filled-text-field>
                <md-filled-text-field :disabled="isPlacingOrder" v-model="lastName" :readonly="store.isLoggedIn" label="Last name">
                  <md-icon slot="leading-icon" v-html="icon('person', true)"  />
                </md-filled-text-field>
              </div>
              <md-filled-text-field :disabled="isPlacingOrder" v-model="email" :readonly="store.isLoggedIn" type="email" label="Email">
                <md-icon slot="leading-icon" v-html="icon('mail', true)"  />
              </md-filled-text-field>

              <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <md-filled-select class="dense" v-if="!store.isLoggedIn" v-model="course" :disabled="store.isLoggedIn || isPlacingOrder" label="Course">
                  <md-icon slot="leading-icon" v-html="icon('school', true)" />
                  <md-select-option v-for="(c, id) in store.courses" :key="id" :value="Number(id)">
                    <span slot="headline">{{ c }}</span>
                  </md-select-option>
                </md-filled-select>
                <md-filled-select v-else label="Course" disabled>
                  <md-icon slot="leading-icon" v-html="icon('school', true)"  />
                  <md-select-option :value="0" selected>
                    <span slot="headline">BSCS</span>
                  </md-select-option>
                </md-filled-select>

                <md-filled-select label="Year level" :disabled="store.isLoggedIn || isPlacingOrder" v-model="year">
                  <md-icon slot="leading-icon" v-html="icon('school', true)" />
                  <md-select-option :value="1" :selected="year === 1">
                    <span slot="headline">1st year</span>
                  </md-select-option>
                  <md-select-option :value="2" :selected="year === 2">
                    <span slot="headline">2nd year</span>
                  </md-select-option>
                  <md-select-option :value="3" :selected="year === 3">
                    <span slot="headline">3rd year</span>
                  </md-select-option>
                  <md-select-option :value="4" :selected="year === 4">
                    <span slot="headline">4th year</span>
                  </md-select-option>
                </md-filled-select>
              </div>

              <div v-if="!store.isLoggedIn" class="flex justify-end items-center text-on-surface-variant text-sm mt-3">
                <label title="Your info will be saved locally in your browser" class="cursor-help">
                  <md-checkbox @change="onSaveInfo" :checked="isSaveInfo" />
                  <span class="ml-3 border-b border-dashed border-outline-variant">Save info for future transactions</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <h3 class="title-large font-medium text-on-surface-variant mb-0.5">Product</h3>
            <p class="label-medium text-on-surface-variant">
              Please review your order before proceeding to checkout.
            </p>
          </div>

          <div class="bg-surface-container justify-between p-10 rounded-2xl flex gap-10 flex-col sm:flex-row items-center">

            <div class="w-32 h-32">
              <VImage
                v-if="store.checkoutDetails.variant?.photos_hash || store.checkoutDetails.product?.photos_hash"
                :src="getPhotoLink(store.checkoutDetails.variant?.photos_hash || store.checkoutDetails.product.photos_hash)"
                :alt="store.checkoutDetails.variant?.name || store.checkoutDetails.product?.name"
                class="!w-32 !h-32"
              />

              <ImageTemplate class="h-full" v-else />
            </div>
            <div class="flex flex-col flex-grow justify-between gap-5 w-full">
              <div class="flex justify-between">
                <div>
                  <h3 class="title-medium text-on-surface-variant">{{ store.checkoutDetails.product.name }}</h3>
                  <h4 class="title-small text-outline">{{ store.checkoutDetails.variant?.name || 'Standard' }}</h4>
                </div>
                <div class="text-primary font-medium title-medium">
                  {{ toCurrency(store.checkoutDetails.product.price) }}
                </div>
              </div>
              <div class="flex justify-end">
                <md-outlined-select :disabled="isPlacingOrder" v-model="quantity" label="Quantity" class="w-min">
                  <md-select-option
                    v-for="i in store.checkoutDetails.product.max_quantity"
                    :key="i"
                    :value="i"
                  >
                    <span slot="headline">{{ i }}</span>
                  </md-select-option>
                </md-outlined-select>
              </div>
            </div>

          </div>
        </div>

        <div class="flex flex-col gap-5">
          <div>
            <h3 class="title-large font-medium text-on-surface-variant mb-0.5">Checkout</h3>
            <p class="label-medium text-on-surface-variant">
              Select your preferred mode of payment
            </p>
          </div>

          <div class="bg-surface-container p-10 rounded-2xl flex flex-col gap-6">
            <div class="flex justify-center gap-2 text-on-surface-variant label-large">
              <md-filter-chip
                :disabled="isPlacingOrder"
                :selected="mop === ModeOfPayment.WALK_IN"
                @click.prevent="mop = ModeOfPayment.WALK_IN"
                label="Walk-in"
              />

              <!-- Disabled for now -->
              <md-filter-chip
                disabled
                label="GCash"
              />
            </div>

            <p class="text-center body-medium">{{ mop === ModeOfPayment.WALK_IN ? Env.checkout_walk_in_message : Env.checkout_gcash_message }}</p>

            <Transition name="slide-fade" mode="out-in">
              <div class="flex-grow flex items-center flex-col justify-center" v-show="mop === ModeOfPayment.GCASH">
                <div class="flex flex-col justify-center items-center my-3">
                  <div class="max-w-[300px] mb-5">
                    <VImage :src="CSPSGcash" alt="CSPS GCash QR Code" />
                  </div>
                  <input @change="onFilePut" type="file" class="file-input" pattern="image/*" accept="image/*" />
                </div>
              </div>
            </Transition>

            <div class="flex flex-col items-center justify-center">
              <md-filled-button :disabled="!canPlaceOrder || isPlacingOrder || isConfirmingOrder" @click="placeOrder">
                {{ isConfirmingOrder ? 'Confirming...' : isPlacingOrder ? 'Placing order...' : 'Place order' }}
              </md-filled-button>

              <p class="mt-5 text-xs text-error" :class="{ 'hidden': canPlaceOrder }">
                Please enter your details to place your order.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { Endpoints, makeRequest } from "~/network/request";
import { toCurrency } from "~/utils/string";
import { getPhotoLink } from '~/utils/network';
import { ModeOfPayment } from "~/types/enums";
import { getStore, removeStore, setStore } from "~/utils/storage";
import { toast } from "vue3-toastify";
import { icon } from '~/utils/icon';
import { useStore, useDialog } from '~/store';
import { Env } from "~/config";

import VImage from '~/components/VImage.vue';
import ImageTemplate from '~/composables/ImageTemplate.vue';
import CSPSGcash from "~/assets/img/csps_gcash.png";
import router from "~/router";

import "@material/web/textfield/filled-text-field";
import "@material/web/select/filled-select";
import "@material/web/select/outlined-select";
import "@material/web/select/select-option";
import "@material/web/button/filled-button";
import "@material/web/checkbox/checkbox";
import "@material/web/chips/filter-chip";

const store = useStore();
const dialog = useDialog();

const firstName = ref();
const lastName = ref();
const studentId = ref();
const course = ref();
const year = ref();
const email = ref();
const quantity = ref(1);
const screenshot = ref();
const isSaveInfo = ref(false);
const mop = ref(ModeOfPayment.WALK_IN);

const isPlacingOrder = ref(false);
const isConfirmingOrder = ref(false);

const canPlaceOrder = computed(() => {
  return firstName.value && lastName.value && studentId.value && email.value &&
    email.value.includes("@") && course.value !== undefined && year.value &&
    (mop.value === ModeOfPayment.WALK_IN || (mop.value === ModeOfPayment.GCASH &&
    screenshot.value && screenshot.value instanceof File));
});

type OrderRequest = {
  products_id: number,
  variations_id?: number,
  mode_of_payment: ModeOfPayment,
  quantity: number,
  student_id?: string,
  student_first_name?: string,
  student_last_name?: string,
  student_email?: string,
  student_course?: number,
  student_year?: number;
  proof?: File;
};

onMounted(() => {
  // If the user is logged in, set the student info to the logged in student
  if (store.isLoggedIn) {
    course.value = 0; // BSCS
    firstName.value = store.user.first_name;
    lastName.value = store.user.last_name;
    studentId.value = store.user.student_id;
    email.value = store.user.email_address;
    year.value = parseInt(store.user.year_level);
  }

  setTimeout(() => {
    // If there is a saved student info and is not logged in, load it
    if (getStore("student") && !store.isLoggedIn) {
      const student = JSON.parse(atob(getStore("student") || ""));
      firstName.value = student.first_name;
      lastName.value = student.last_name;
      studentId.value = student.student_id;
      course.value = parseInt(student.course);
      email.value = student.email_address;
      year.value = parseInt(student.year_level);
      isSaveInfo.value = true;
    }
  }, 0);
});

function onSaveInfo(ev: Event) {
  isSaveInfo.value = (ev.target as HTMLInputElement).checked;
}

function placeOrder() {
  isConfirmingOrder.value = true;

  const id = dialog.open("Confirm Order", "All set to complete your order? Click 'Confirm' to proceed.", {
    text: "Confirm",
    click() {
      dialog.close(id);

      if (!store.checkoutDetails) {
        toast.error("No product to checkout!");
        return;
      }

      if (!store.checkoutDetails.product.is_available) {
        toast.error("Product is not available yet!");
        return;
      }

      if (!canPlaceOrder.value) {
        toast.error("Please fill up all the required fields!");
        return;
      }

      store.isLoading = true;
      isPlacingOrder.value = true;

      const data: OrderRequest = {
        products_id: store.checkoutDetails.product.id,
        mode_of_payment: mop.value,
        quantity: quantity.value,
      };

      if (store.checkoutDetails.variant) {
        data.variations_id = store.checkoutDetails.variant.id;
      }

      if (!store.isLoggedIn) {
        data.student_id = studentId.value;
        data.student_first_name = firstName.value;
        data.student_last_name = lastName.value;
        data.student_email = email.value;
        data.student_course = course.value;
        data.student_year = year.value;
      }

      // If save info is checked, save the student info to local storage in base64 encoded string
      if (isSaveInfo.value) {
        setStore("student", btoa(JSON.stringify({
          student_id: studentId.value,
          first_name: firstName.value,
          last_name: lastName.value,
          email_address: email.value,
          course: course.value,
          year_level: year.value,
        })));
      }

      // Otherwise, remove the student info from local storage
      else {
        removeStore("student");
      }

      if (mop.value === ModeOfPayment.GCASH) {
        data.proof = screenshot.value;
      }

      makeRequest<string, OrderRequest>("POST", Endpoints.Orders, data, response => {  
        store.isLoading = false;
        isPlacingOrder.value = false;

        if (response.success) {
          const [ title, message ] = response.message.split("_");

          const id = dialog.open(title, message, {
            text: "Gotchu",
            click() {
              dialog.close(id);
            }
          }, null, () => {
            router.replace({ name: "Merch" });
          });

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
  }, () => {
    isConfirmingOrder.value = false;
  });
}

function onFilePut(event: Event) {
  let file = (event.target as HTMLInputElement).files?.[0];
  
  if (!file) {
    screenshot.value = undefined;
    return;
  }

  screenshot.value = file;
}
</script>

<style lang="scss" scoped>
md-filled-text-field {
  @apply w-full;
}
</style>