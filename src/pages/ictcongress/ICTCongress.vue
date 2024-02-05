<template>
  <div class="flex justify-center items-center font-bold">
    <div class="custom-sm:flex-row">
      <class class="flex justify-center items-center w-[100%]">
        <div
          class="lg:w-[50%] md:w-[90%] custom-sm:w-[90%] sm:w-[90%] flex mt-10 shadow-2xl bg-gray-100 rounded-xl p-5 md:justify-between custom-sm:flex custom-sm:flex-col custom-sm:items-center"
        >
          <div
            class="custom-sm:mt-[4%] lg:w-[50%] md:w-[50%] custom-sm:w-[90%] sm:w-[60%] flex flex-col bg-csps-primary text-[#ffffff] lg:p-10 justify-center rounded-xl items-center"
          >
            <img
              class="rounded-3xl lg:w-[100%] md:w-[90%] custom-sm:w-[100%] custom-sm:p-[5%] sm:p-[5%]"
              :src="getImagePath('ictcongressimage/ICTCongress.png')"
              alt="Campus Image"
            />
          </div>
          <div class="lg:w-[50%] md:w-[50%] items-end]">
            <div class="flex flex-col lg:items-center md:items-end">
              <div class="relative ml-3 mb-3 flex flex-col gap-1 mt-10">
                <md-outlined-text-field
                  label="Student ID"
                  type="text"
                  maxLength="8"
                  hasLeadingIcon="true"
                  @keydown.enter=""
                  required
                >
                  <md-icon slot="leading-icon" v-html="icon('badge', true)" />
                </md-outlined-text-field>
              </div>
              <div class="relative ml-3 mb-3">
                <md-outlined-text-field
                  label="First Name"
                  type="text"
                  hasLeadingIcon="true"
                  @keydown.enter=""
                  required
                >
                  <md-icon slot="leading-icon" v-html="icon('badge', true)" />
                </md-outlined-text-field>
              </div>
              <div class="relative ml-3 mb-3">
                <md-outlined-text-field
                  label="Last Name"
                  type="text"
                  class="mt-[2%]"
                  hasLeadingIcon="true"
                  @keydown.enter=""
                  required
                >
                  <md-icon slot="leading-icon" v-html="icon('badge', true)" />
                </md-outlined-text-field>
              </div>
              <div class="relative ml-3 mb-3">
                <md-outlined-text-field
                  label="Campus Name"
                  type="text"
                  class="mt-[2%]"
                  hasLeadingIcon="true"
                  @keydown.enter=""
                  required
                >
                  <md-icon slot="leading-icon" v-html="icon('badge', true)" />
                </md-outlined-text-field>
              </div>

              <div class="relative ml-3 mb-3">
                <md-outlined-text-field
                  label="Email"
                  class="mt-[2%]"
                  type="text"
                  hasLeadingIcon="true"
                  @keydown.enter=""
                  required
                >
                  <md-icon slot="leading-icon" v-html="icon('badge', true)" />
                </md-outlined-text-field>
              </div>
              <div class="relative ml-3 mb-3">
                <md-outlined-text-field
                  label="T-Shirt Size"
                  class="mt-[2%]"
                  type="text"
                  hasLeadingIcon="true"
                  @keydown.enter=""
                  required
                >
                  <md-icon slot="leading-icon" v-html="icon('badge', true)" />
                </md-outlined-text-field>
                <div class="flex justify-start mt-[6%]">
                  <md-filled-button @click="" class="w-3/3">
                    Register
                  </md-filled-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </class>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "@material/web/textfield/outlined-text-field";
import "@material/web/iconbutton/icon-button";
import "@material/web/button/filled-button";
import "@material/web/button/filled-tonal-button";
import "@material/web/button/text-button";
import "@material/web/checkbox/checkbox";
import "@material/web/divider/divider";
import { icon } from "~/utils/icon";
const getImagePath = (ictcongressimage: string) => {
  return `/src/assets/img/${ictcongressimage}`;
};
</script>
