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
            <div class="flex flex-col gap-6 flex-grow">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <md-filled-text-field :disabled="isPlacingOrder" v-model="firstName" :readonly="store.isLoggedIn" label="First name">
                  <md-icon slot="leadingicon" v-html="icon('person', true)"  />
                </md-filled-text-field>
                <md-filled-text-field :disabled="isPlacingOrder" v-model="lastName" :readonly="store.isLoggedIn" label="Last name">
                  <md-icon slot="leadingicon" v-html="icon('person', true)"  />
                </md-filled-text-field>
              </div>
              <md-filled-text-field :disabled="isPlacingOrder" v-model="studentId" :readonly="store.isLoggedIn" type="number" min="0" label="Student ID">
                <md-icon slot="leadingicon" v-html="icon('badge', true)"  />
              </md-filled-text-field>
              <md-filled-text-field :disabled="isPlacingOrder" v-model="email" :readonly="store.isLoggedIn" type="email" label="Email">
                <md-icon slot="leadingicon" v-html="icon('mail', true)"  />
              </md-filled-text-field>

              <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <md-filled-select v-if="!store.isLoggedIn" v-model="course" :disabled="store.isLoggedIn || isPlacingOrder" label="Course" quick>
                  <md-icon slot="leadingicon" v-html="icon('school', true)"  />
                  <md-select-option v-for="(course, id) in courses" :key="id" :value="id" :headline="course" />
                </md-filled-select>
                <md-filled-select v-else v-model="course" label="Course" disabled quick>
                  <md-icon slot="leadingicon" v-html="icon('school', true)"  />
                  <md-select-option :value="1" headline="BSCS" />
                </md-filled-select>

                <md-filled-select label="Year level" :disabled="store.isLoggedIn || isPlacingOrder" v-model="year" quick>
                  <md-icon slot="leadingicon" v-html="icon('school', true)" />
                  <md-select-option :value="1" headline="1st year" />
                  <md-select-option :value="2" headline="2nd year" />
                  <md-select-option :value="3" headline="3rd year" />
                  <md-select-option :value="4" headline="4th year" />
                </md-filled-select>
              </div>

              <div v-if="!store.isLoggedIn" class="flex justify-end items-center text-on-surface-variant text-sm mt-3">
                <label title="Your info will be saved locally in your browser" class="cursor-help">
                  <md-checkbox />
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
                v-if="(store.checkoutDetails.variant?.photos_id && store.checkoutDetails.variant?.photos_id > 0) || (store.checkoutDetails.product?.thumbnail && store.checkoutDetails.product?.thumbnail > 0)"
                :src="getPhotoLink(store.checkoutDetails.variant?.photos_id ? store.checkoutDetails.variant.photos_id : store.checkoutDetails.product.thumbnail || -1)"
                :alt="store.checkoutDetails.variant?.name || store.checkoutDetails.product?.name"
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
                <md-outlined-select :disabled="isPlacingOrder" v-model="quantity" label="Quantity" class="w-min" quick>
                  <md-select-option
                    v-for="i in store.checkoutDetails.product.max_quantity"
                    :key="i"
                    :value="i"
                    :headline="i"
                  />
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
            <div class="flex justify-center gap-5 text-on-surface-variant label-large">
              <label>
                <md-radio
                  :disabled="isPlacingOrder"
                  :checked="mop === ModeOfPayment.WALK_IN"
                  @click="mop = ModeOfPayment.WALK_IN"
                />
                <span class="ml-2">Walk-in</span>
              </label>
              <label>
                <md-radio
                  :disabled="isPlacingOrder"
                  :checked="mop === ModeOfPayment.GCASH"
                  @click="mop = ModeOfPayment.GCASH"
                />
                <span class="ml-2">GCash</span>
              </label>
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
              <md-filled-button :disabled="!canPlaceOrder || isPlacingOrder" @click="placeOrder">
                {{ isPlacingOrder ? 'Placing order...' : 'Place order' }}
              </md-filled-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { Endpoints, makeRequest } from "~/network/request";
import { toCurrency } from "~/utils/string";
import { getPhotoLink } from '~/utils/network';
import { ModeOfPayment } from "~/types/enums";
import { toast } from "vue3-toastify";
import { icon } from '~/utils/icon';
import { useStore } from '~/store';
import { Env } from "~/config";

import VImage from '~/components/VImage.vue';
import ImageTemplate from '~/composables/ImageTemplate.vue';
import CSPSGcash from "~/assets/img/csps_gcash.png";

import "@material/web/textfield/filled-text-field";
import "@material/web/select/filled-select";
import "@material/web/select/outlined-select";
import "@material/web/select/select-option";
import "@material/web/button/filled-button";
import "@material/web/checkbox/checkbox";
import "@material/web/radio/radio";

const store = useStore();
const router = useRouter();
const courses = ref();

const firstName = ref();
const lastName = ref();
const studentId = ref();
const course = ref();
const year = ref();
const email = ref();
const quantity = ref(1);
const screenshot = ref();
const mop = ref(ModeOfPayment.WALK_IN);

const isPlacingOrder = ref(false);

const canPlaceOrder = computed(() => {
  return firstName.value && lastName.value && studentId.value && email.value && email.value.includes("@") && course.value && year.value &&
    (mop.value === ModeOfPayment.WALK_IN || (mop.value === ModeOfPayment.GCASH && screenshot.value && screenshot.value instanceof File));
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
  quantity.value = store.checkoutDetails?.product.max_quantity || 1;

  if (store.isLoggedIn) {
    course.value = 1;
    firstName.value = store.student.first_name;
    lastName.value = store.student.last_name;
    studentId.value = store.student.student_id;
    email.value = store.student.email_address;
    year.value = store.student.year_level;
  }

  makeRequest("GET", Endpoints.Courses, null, response => {
    if (response.success) {
      courses.value = response.data;
      return;
    }

    toast.error(response.message);
  });
});

function placeOrder() {
  if (!store.checkoutDetails) {
    toast.error("No product to checkout!");
    return;
  }

  // if (!canPlaceOrder.value) return;
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

  if (mop.value === ModeOfPayment.GCASH) {
    data.proof = screenshot.value;
  }

  makeRequest<string>("POST", Endpoints.Orders, data, response => {  
    store.isLoading = false;
    isPlacingOrder.value = false;

    if (response.success) {
      toast.success(response.message);

      router.replace({ name: "Receipt", params: {
        receipt: response.data
      }});

      return;
    }

    toast.error(response.message);
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