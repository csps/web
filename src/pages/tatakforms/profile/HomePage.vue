<template>
  <div class="container px-7 flex flex-col gap-3">
    <div class="mt-1 flex flex-col lg:justify-center lg:items-center">
        <h4 class="headline-medium font-semibold text-primary">Hello, {{store.user.first_name}} {{store.user.last_name}}</h4>
        <div>
        <md-filled-button class="">View Profile</md-filled-button>
        </div>
    </div>

    <div class="flex flex-col lg:grid lg:grid-cols-2 lg:mt-5">

    <div v-for="e in events" class="mt-3 lg:order-0 lg:ms-5">
        <h5 class="title-medium font-bold text-primary">Event</h5>
        <router-link :to="`/tatakforms/event/${e.slug}`">
        <div class="event px-5 py-3 mt-3 -translate-y-1 w-full sm:w-2/3 md:w-2/5 lg:w-1/3 xl:w-min !overflow-visible">
            <md-ripple />
            <div class="content">
                <div class="w-full">
                    <h5 class="label-large mb-2 text-error"></h5>
                    <h4 class="title-large font-bold text-outline">{{e.name}}</h4>
                    <h3 class="flex items-center text-outline">
                        <md-icon class="mr-2" v-html="icon('event')" />
                        {{getHumanDate(new Date(e.from_date))}} to
                        {{getHumanDate(new Date(e.to_date))}}
                    </h3>
                </div>
            </div>
        </div>
        </router-link>
    </div>

    <div class="mt-5">
        <h5 class="title-medium font-semibold text-primary mb-2">Recent Activity</h5>
        <section>
            <div>
              <div v-for="history in attendanceHistory">
                  <p class="font-semibold">UC DAYS 2024 - ATTENDANCE</p>
                  <p class="text-outline text-xs lg:text-sm">{{getReadableDate(history)}}</p>
                  <md-divider inset-end class="my-3"></md-divider>
              </div>
            </div>
        </section>
    </div>

    </div>

  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { isEmail } from '~/utils/string';
import { Endpoints, makeRequest } from '~/network/request';
import { mapYearLevel } from '~/utils/page';
import { useStore, useDialog } from '~/store';
import { icon } from '~/utils/icon';
import { getReadableDate,getHumanDate } from "~/utils/date";
import sal from "sal.js";
import dayjs from "dayjs";

import "@material/web/textfield/filled-text-field";
import "@material/web/button/text-button";
import "@material/web/button/filled-tonal-button";
import "@material/web/button/filled-button";
import "@material/web/select/filled-select";
import "@material/web/select/select-option";
import "@material/web/icon/icon";
import "@material/web/ripple/ripple";

import cas from "~/assets/img/tatakform/colleges/cas.png";

const store = useStore();
const route = useRoute();
const router = useRouter();

const isRegistered = ref(false);
const isFetchingTatakform = ref(true);
const isFetchingCourses = ref(true);

const errorMessage = ref("");
const attendanceHistory = ref([])
const events = ref<TatakformModel[]>([])
onMounted(() => {
  makeRequest<any, { acronym: string }>("GET", Endpoints.TatakformsAttendanceHistory, {}, response => {
    
    if (response.success) {
      if(response.data[1]>0){
        const dataObj = response.data[0][0]
        Object.keys(dataObj).forEach(key => {
          if(dataObj[key]){
            const data = dataObj[key].toString().split(" ")
            if(data.length > 1){
              attendanceHistory.value.push(dataObj[key])
            }
          }
        })
      }
      return;
    }
    errorMessage.value = response.message;
    toast.error(response.message);
  });

  makeRequest<TatakformModel[], { acronym: string }>("GET", Endpoints.Tatakforms, {}, response => {
    
    if (response.success) {
      console.log(response.data)
      events.value = response.data
      return;
    }

    errorMessage.value = response.message;
    toast.error(response.message);
  });


  sal();
});

</script>


<style lang="scss" scoped>
.event {
  @apply flex flex-col justify-between relative bg-surface-container-low rounded-xl;
  animation: glow 1.5s ease-in-out infinite alternate;

  .foreground {
    @apply bg-surface-container-high rounded-xl;
  }

  .content {
    @apply font-medium rounded-2xl min-w-80;
  }
}
</style>