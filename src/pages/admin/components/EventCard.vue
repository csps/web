<template>
  <div class="bg-surface-container-low rounded-2xl p-6 relative" role="button">
    <md-ripple />
    <div class="flex gap-5">
      <div class="text-on-surface-variant w-full">
        <div class="flex justify-between gap-6 w-full">
          <div class="flex gap-6">
            <div class="text-primary">
              <h3 class="headline-small font-bold">{{ event.start_date_stamp.substring(8, 10) }}</h3>
              <h5 class="text-center font-medium title-medium">{{ getMonthName(parseInt(event.start_date_stamp.substring(5, 7))).toUpperCase() }}</h5>
            </div>  
            <div class="flex flex-col gap-1 justify-center">
              <h3 class="body-large font-medium flex items-center gap-1">
                {{ event.title }}
              </h3>
              <h5 class="text-outline flex items-center body-small gap-1">
                <md-icon class="w-5 h-5" v-html="icon('location_on')" /> {{ event.venue }}
              </h5>
              <p class="text-secondary body-small text-justify mt-3">{{ event.description }}</p>
            </div>
          </div>
          <div class="mt-0.5 body-small flex flex-col justify-between items-end">
            #{{ event.id }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "@material/web/icon/icon";
import "@material/web/ripple/ripple";
import "@material/web/icon/icon";

import { getMonthName } from "~/utils/date";
import { icon } from "~/utils/icon";

defineProps<{
  event: EventModel;
}>();
</script>
