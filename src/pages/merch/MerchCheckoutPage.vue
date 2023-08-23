<template>
  <div class="container mx-auto p-6 w-full lg:w-full 2xl:w-4/5 3xl:w-3/5 h-full">
    <div class v-if="store.checkoutDetails">
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div class="flex flex-col gap-5 flex-grow">
          <div>
            <h2 class="title-large font-medium text-on-surface-variant mb-0.5">Product details</h2>
            <p class="label-medium text-on-surface-variant">You are purchasing the following item</p>
          </div>

          <div class="bg-surface-container-low justify-between p-10 rounded-2xl flex gap-10 flex-col sm:flex-row items-center">

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
                  &#8369; {{ store.checkoutDetails.product.price }}
                </div>
              </div>
              <div class="flex justify-end">
                <md-outlined-select v-model="quantity" label="Quantity" class="w-min" quick>
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

          <div>
            <h3 class="title-large font-medium text-on-surface-variant mb-0.5">Student information</h3>
            <p class="label-medium text-on-surface-variant">{{ Env.checkout_student_details_info }}</p>
          </div>

          <div class="bg-surface-container-low p-10 rounded-xl">
            <div class="flex flex-col gap-5 flex-grow">
              <div class="flex flex-col md:flex-row gap-5">
                <md-filled-text-field v-model="firstName" label="First name">
                  <md-icon slot="leadingicon" v-html="icon('person', true)"  />
                </md-filled-text-field>
                <md-filled-text-field v-model="lastName" label="Last name">
                  <md-icon slot="leadingicon" v-html="icon('person', true)"  />
                </md-filled-text-field>
              </div>
              <div class="flex flex-col md:flex-row gap-5">
                <md-filled-text-field v-model="studentId" type="number" min="0" label="Student ID">
                  <md-icon slot="leadingicon" v-html="icon('badge', true)"  />
                </md-filled-text-field>
                <md-filled-text-field v-model="email" type="email" label="Email">
                  <md-icon slot="leadingicon" v-html="icon('mail', true)"  />
                </md-filled-text-field>
              </div>
              <md-filled-select v-model="course" label="Course" quick>
                <md-icon slot="leadingicon" v-html="icon('school', true)"  />
                <md-select-option v-for="(course, id) in courses" :key="id" :value="id" :headline="course" />
              </md-filled-select>
              <div class="flex justify-end items-center text-on-surface-variant text-sm mt-3">
                <label title="Your info will be saved locally in your browser" class="cursor-help">
                  <md-checkbox />
                  <span class="ml-3 border-b border-dashed border-outline-variant">Save info for future transactions</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-5">
          <div>
            <h3 class="title-large font-medium text-on-surface-variant mb-0.5">Checkout details</h3>
            <p class="label-medium text-on-surface-variant">
              Select your mode of payment and place your order!
            </p>
          </div>
      
          <div class="bg-surface-container-low p-10 rounded-2xl flex flex-col gap-6">
            <div class="flex justify-center gap-5 text-on-surface-variant label-large">
              <label>
                <md-radio
                  :checked="mop === ModeOfPayment.WALK_IN"
                  @click="mop = ModeOfPayment.WALK_IN"
                />
                <span class="ml-2">Walk-in</span>
              </label>
              <label>
                <md-radio
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

                  <!-- <h3 class="title-medium font-medium text-primary"></h3>
                    <h4 class="title-small">09123456789</h4> -->

                  <input @change="onFilePut" type="file" class="file-input" pattern="image/*" accept="image/*" />
                </div>
              </div>
            </Transition>

            <div class="flex flex-col items-center justify-center">
              <md-filled-button :disabled="!canPlaceOrder">
                Place order
              </md-filled-button>
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
const courses = ref();

const firstName = ref();
const lastName = ref();
const studentId = ref();
const course = ref();
const email = ref();
const quantity = ref(1);
const screenshot = ref();
const mop = ref(ModeOfPayment.WALK_IN);

const canPlaceOrder = computed(() => {
  return firstName.value && lastName.value && studentId.value && email.value && email.value.includes("@") && course.value && 
    (mop.value === ModeOfPayment.WALK_IN || (mop.value === ModeOfPayment.GCASH && screenshot.value && screenshot.value instanceof File));
});

onMounted(() => {
  quantity.value = store.checkoutDetails?.product.max_quantity || 1;

  makeRequest("GET", Endpoints.Courses, null, response => {
    if (response.success) {
      courses.value = response.data;
      return;
    }

    toast.error(response.message);
  });
});

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

.file-input {
  @apply bg-surface-container-low w-full text-sm rounded-md
    placeholder:text-on-surface-variant file:bg-surface-container-high file:rounded-md
    file:border-none file:mr-2 file:px-4 file:py-2 file:cursor-pointer
    file:text-on-surface-variant ;
}
</style>