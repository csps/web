<template>
  <div class="flex justify-center items-center font-bold">
    <class class="flex justify-center items-center">
      <div class="w-[50%] flex mt-10 shadow-2xl bg-gray-100 rounded-xl p-5">
        <div
          class="lg:w-[50%] custom-sm:w-[25%] md:w-[40%] flex flex-col bg-csps-primary text-[#ffffff] lg:p-10 justify-center rounded-xl rounded-tr-xl rounded-bl-xl items-center"
        >
          <img
            class="w-[80%] rounded-3xl border-2 border-primary"
            src="../assets/img/ictcongress/ICTCongress.png"
            alt=""
          />
        </div>
        <div class="lg:w-[50%]">
          <div class="flex flex-col items-center">
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
            </div>
          </div>
          <div class="flex justify-start ml-[20%] mt-[2%]">
            <md-filled-button @click="" class="w-3/3">
              Register
            </md-filled-button>
          </div>
        </div>
      </div>
    </class>
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
</script>
