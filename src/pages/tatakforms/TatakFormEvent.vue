<template>
  <div class="container mx-auto p-6 w-full lg:w-full xl:w-3/4 3xl:w-3/5 h-full flex-col flex justify-center text-on-surface-variant">
    <Transition name="slide-fade" mode="out-in">
      <div v-if="errorMessage.length === 0">
        <div v-if="isFetchingColleges || isFetchingTatakform" key="loading" class="flex flex-col gap-2.5 justify-center items-center h-full">
          <md-linear-progress indeterminate />
          <span>Fetching {{ 'colleges' }}...</span>
        </div>
        <div v-else>
          
          <p class="text-center font-medium text-outline">Step 1: Select your college</p>
          <div class="grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-4 mt-6">
            <div
              v-for="college in colleges"
              :key="college.id"
              class="bg-surface-container px-6 py-4 rounded-xl flex justify-between items-center gap-4"
            >
              <div class="flex gap-4 items-center">
                <img class="rounded-full w-16 h-16" :src="getCollegeLogo(college.acronym.toLowerCase())" :alt="college.name" />
                <div>
                  <div class="font-medium text-left">{{ college.name }}</div>
                  <div class="text-xs text-left text-outline mt-1">{{ college.acronym }}</div>
                </div>
              </div>
              <div>
                <router-link :to="`/tatakforms/register/${college.acronym.toLowerCase()}`">
                  <md-outlined-button>Select</md-outlined-button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="error flex justify-center items-center">
        <div class="bg-error rounded-[28px] text-on-error p-6">
          {{ errorMessage }}

          <div class="flex justify-center items-center mt-3">
            <router-link to="/tatakforms">
              <md-text-button>
                <md-icon v-html="icon('arrow_back')" slot="icon" />
                Go back
              </md-text-button>
            </router-link>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { toast } from "vue3-toastify";
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { Endpoints, makeRequest } from '~/network/request';
import { icon } from "~/utils/icon";

import "@material/web/iconbutton/icon-button"
import "@material/web/button/filled-button";
import "@material/web/icon/icon";
import "@material/web/button/filled-button";
import "@material/web/button/outlined-button";
import "@material/web/textfield/outlined-text-field";
import "@material/web/select/outlined-select";
import "@material/web/select/select-option";
import "@material/web/progress/linear-progress";

import cas from "~/assets/img/tatakform/colleges/cas.png";
import cba from "~/assets/img/tatakform/colleges/cba.png";
import cca from "~/assets/img/tatakform/colleges/cca.png";
import ccj from "~/assets/img/tatakform/colleges/ccj.png";
import ccs from "~/assets/img/tatakform/colleges/ccs.png";
import chm from "~/assets/img/tatakform/colleges/chm.png";
import coe from "~/assets/img/tatakform/colleges/coe.png";
import csw from "~/assets/img/tatakform/colleges/csw.png";
import cte from "~/assets/img/tatakform/colleges/cte.png";

import dayjs from 'dayjs';
import sal from "sal.js";

const route = useRoute();
const colleges = ref<CollegeModel[]>([]);
const isFetchingColleges = ref(true);
const errorMessage = ref("");

onMounted(() => {
  // Get colleges
  makeRequest<CollegeModel[], null>("GET", Endpoints.Colleges, null, response => {
    isFetchingColleges.value = false;

    if (response.success) {
      colleges.value = response.data;
      setTimeout(sal, 200);
      return;
    }
    
    errorMessage.value = response.message;
    toast.error(response.message);
  });
});

/**
 * Get college logo
 */
function getCollegeLogo(acronym: string) {
  switch (acronym) {
    case "cas": return cas;
    case "cba": return cba;
    case "cca": return cca;
    case "ccj": return ccj;
    case "ccs": return ccs;
    case "chm": return chm;
    case "coe": return coe;
    case "csw": return csw;
    case "cte": return cte;
    default: return "";
  }
}
</script>

<style lang="scss" scoped>
.error md-text-button {
  --md-sys-color-primary: var(--md-sys-color-on-error);
}
</style>