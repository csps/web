<template>
  <div class="w-full h-full py-8">
    <div v-if="isRootLoading" class="flex flex-col justify-center items-center gap-3 body-medium">
      <md-linear-progress indeterminate />
      <span>Fetching events and activities...</span>
    </div>

    <div v-else class="container mx-auto px-6 flex flex-col items-center">
      <h2 class="title-large font-semibold text-on-surface-variant">Events & Activities</h2>
      <p class="title-small text-outline text-center">Check out our bulletin board for a list of upcoming events and activities!</p>

      <div class="w-full 2xl:w-3/4">

        <div class="flex flex-col-reverse 2xl:grid 2xl:grid-cols-6 gap-16 justify-center mt-10">
          <div class="w-full flex-grow col-span-2">
            <div v-if="isLoading" class="flex flex-col justify-center items-center gap-3 body-medium">
              <md-linear-progress indeterminate />
              <span>Fetching events and activities...</span>
            </div>
            <div class="bg-surface-container-low p-10 rounded-3xl text-center text-on-surface-variant  body-medium flex justify-center items-center" v-else-if="message.length > 0">
              {{ message }}
            </div>
            <VTimeline v-else :data="data" />
          </div>
  
          <div class="hidden md:block col-span-4">
            <Calendar
              ref="c1"
              @did-move="($event: Event) => onChange($event, 1)"
              class="custom-calendar w-full"
              :masks="{ weekdays: 'WWW' }"
              :attributes="attributes"
              :is-dark="store.isDark"
              disable-page-swipe
              color="purple"
            >
              <template v-slot:day-content="{ day, attributes }">
                <div class="flex flex-col h-full z-10 overflow-hidden">
                  <span class="day-label title-small text-on-surface-variant">{{ day.day }}</span>
                  <div class="flex-grow overflow-y-auto overflow-x-auto">
                    <p
                      v-for="attr in attributes"
                      :key="attr.key"
                      class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
                      :class="attr.customData?.class"
                    >
                      {{ attr?.customData?.title }}
                    </p>
                  </div>
                </div>
              </template>
            </Calendar>
          </div>
  
          <div class="md:hidden flex justify-center">
            <Calendar
              ref="c2"
              @did-move="($event: Event) => onChange($event, 2)"
              class="w-full"
              :attributes="attributes"
              :is-dark="store.isDark"
              disable-page-swipe
              color="purple"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { Calendar } from 'v-calendar';
import { useStore } from '~/store';
import { Endpoints, makeRequest } from "~/network/request";
import { PaginationRequest } from "~/types/request";
import { EventEnum } from "~/types/models";
import { toast } from "vue3-toastify";

import VTimeline from '~/components/VTimeline.vue';

import "@material/web/progress/linear-progress";
import 'v-calendar/style.css';

const c1 = ref();
const c2 = ref();
const store = useStore();
const isRootLoading = ref(true);
const isLoading = ref(true);
const message = ref("");
const attributes = ref<any[]>([]);
const data = ref<TimelineData[]>([]);
const year = ref(new Date().getFullYear());
const month = ref(new Date().getMonth());

onMounted(() => {
  fetchEvents(getYearMonth(year.value, month.value + 1));
});

watch([year, month], ([y, m]) => {
  fetchEvents(getYearMonth(y, m + 1));
});

/**
 * Fetch events from the server
 */
function fetchEvents(search = "") {
  store.isLoading = true;
  isLoading.value = true;
  message.value = "";

  const request: PaginationRequest = {
    page: 1,
    search_value: [search],
    search_column: [EventEnum.date],
    limit: -1,
    sort_column: EventEnum.date,
    sort_type: "ASC",
  };


  makeRequest<EventModel[]>("GET", Endpoints.Events, request, response => {
    isLoading.value = false;
    store.isLoading = false;
    isRootLoading.value = false;
    attributes.value = [
      {
        key: 'today',
        customData: {
          title: 'Today',
          class: 'bg-surface-variant text-on-surface-variant',
        },
        dates: new Date()
      }
    ];

    if (response.success) {
      data.value = response.data.map(event => {
        attributes.value.push({
          key: event.id,
          customData: {
            title: event.title,
            class: 'bg-primary text-on-primary',
          },
          dates: new Date(event.date)
        });

        return {
          title: event.title,
          content: event.description,
          date: event.date,
          time: event.start_time.substring(0, 5) + " - " + event.end_time.substring(0, 5),
          location: event.venue,
          thumbnail: event.thumbnail,
        };
      });

      attributes.value.push({
        key: 'today1',
        highlight: true,
        dates: new Date(),
        popover: {
          label: 'Today',
        }
      });

      return;
    }

    message.value = response.message;
    console.warn(response.message);
  });
}

// For AND circuit search condition 
let x: number, y: number;

/**
 * On date change
 */
function onChange(e: any, c: number) {
  if (e.length === 0) {
    toast.error("Can't get date. Please try again. :(");
    return;
  }

  if (c === 1) {
    c2.value.move({ year: e[0].year, month: e[0].month });
    x = 1;
  }
  
  if (c === 2) {
    c1.value.move({ year: e[0].year, month: e[0].month });
    y = 1;
  }
  
  if (x > 0 && y > 0) {
    fetchEvents(getYearMonth(e[0].year, e[0].month));
    x = 0;
    y = 0;
  }
}

/**
 * Get year and month 
 */
function getYearMonth(year: number, month: number) {
  return year + "-" + (month < 10 ? "0" + month : month);
}
</script>

<style lang="scss">
.custom-calendar.vc-container {
  --day-width: 90px;
  --day-height: 90px;

  border-radius: 12px;
  width: 100%;

  & .vc-highlight-bg-solid {
    @apply bg-transparent;
  }
 
  & .vc-header {
    @apply h-16 bg-surface-container-low mt-0 rounded-tl-xl rounded-tr-xl;

    .vc-title, .vc-title:hover {
      @apply text-on-surface opacity-[0.9];
    }
  }

  & .vc-weeks {
    padding: 0;
  }

  & .vc-weekday {
    @apply bg-surface-container border-t border-b border-outline-variant py-2 text-on-surface-variant;
  }

  & .vc-day {
    @apply bg-surface-container-low;

    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);

    &.weekday-1,
    &.weekday-7 {
      @apply bg-surface-container;
    }

    &:not(.on-bottom) {
      @apply border-b border-outline-variant;
    }

    &:not(.on-right) {
      @apply border-r border-outline-variant;
    }
  }

  & .vc-day-dots {
    margin-bottom: 5px;
  }
}

.vc-light {
  --vc-border: transparent;;
  --vc-bg: var(--md-sys-color-surface-container);
}

.vc-dark {
  --vc-border: transparent;
  --vc-bg: var(--md-sys-color-surface-container);
  --vc-color: var(--md-sys-color-on-surface);
  --vc-popover-content-bg: var(--md-sys-color-surface-variant);
  --vc-day-content-disabled-color: var(--md-sys-color-surface-variant);
  
  &.vc-popover-content {
    border: none;
  }
}

.vc-purple {
  --vc-accent-900: #56216b;
  --vc-accent-800: #58236d;
  --vc-accent-700: #652f7a;
  --vc-accent-600: #723c87;
  --vc-accent-500: #7f4894;
  --vc-accent-400: #9a61ae;
  --vc-accent-300: #b67aca;
  --vc-accent-200: #d294e7;
  --vc-accent-100: #edb1ff;
  --vc-accent-50: #f5ccff;
}
</style>
