<template>
  <div class="container mx-auto px-6">
    <div class="flex items-center justify-center w-full h-full">
      <div class="">
        <h2 class="text-2xl md:text-3xl font-bold mb-1 text-on-surface-variant">Welcome back, <span class="text-primary">ka-CSPS!</span></h2>
        <h6 class="text-sm">To login, please enter your details.</h6>

        <div class="flex flex-col gap-1 mt-8">
          <md-outlined-text-field
            label="Student ID"
            type="text"
            maxLength="8"
            hasLeadingIcon="true"
            required
          >
            <md-icon slot="leadingicon" v-html="icon('verified', true)" />
          </md-outlined-text-field>

          <md-outlined-text-field
            label="Password"
            type="password"
            maxLength="24"
            required
          >
            <md-icon slot="leadingicon" v-html="icon('lock', true)" />
          </md-outlined-text-field>
        </div>

        <div class="flex justify-between items-center">
          <label class="flex items-center text-sm">
            <md-checkbox />
            Remember Me
          </label>
          <md-text-button variant="dense">
            Forgot Password?  
          </md-text-button>
        </div>

        <div class="flex justify-center mt-3">
          <md-filled-button class="w-full">
            Login
          </md-filled-button>
        </div>

        <md-divider class="mt-6 mb-2" />

        <div class="flex justify-center">
          <md-text-button class="secondary">
            Don't have an account? Register here.
          </md-text-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "@material/web/textfield/outlined-text-field";
import "@material/web/button/filled-button";
import "@material/web/button/text-button";
import "@material/web/checkbox/checkbox";
import "@material/web/divider/divider";

import { icon } from "~/utils/icon";
</script>