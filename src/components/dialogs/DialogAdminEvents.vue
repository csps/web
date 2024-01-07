<template>
  <md-dialog
    ref="dialog"
    :open="isDialogOpen"
    @close="close"
    :scrim-click-action="isLoading ? '' : 'close'"
    :escape-key-action="isLoading ? '' : 'close'"
  >
    <div slot="headline">{{ event ? 'Update' : 'Add' }} Event</div>
    <div slot="content" class="space-y-5 relative z-[100000]">
      <md-filled-text-field
        class="w-full"
        label="Title"
        v-model.trim="title"
        :disabled="isLoading"
        @keydown.enter="submit"
      >
        <md-icon slot="leading-icon" v-html="icon('campaign', true)" />
      </md-filled-text-field>
      <md-filled-text-field
        class="w-full"
        label="Description"
        type="textarea"
        v-model.trim="description"
        :disabled="isLoading"
        @keydown.enter="submit"
      >
        <md-icon slot="leading-icon" v-html="icon('tune', true)" />
      </md-filled-text-field>
      
      <div class="grid grid-cols-2 gap-5">
        <md-filled-text-field
          class="w-full"
          label="Venue"
          v-model.trim="venue"
          :disabled="isLoading"
          @keydown.enter="submit"
        >
          <md-icon slot="leading-icon" v-html="icon('location_on', true)" />
        </md-filled-text-field>
  
        <DatePicker
          v-model="date"
          :attributes="attributes"
          :is-dark="store.isDark"
          class="inline-block"
          color="purple"
          popover
        >
          <template #default="{ togglePopover }">
            <md-filled-text-field
              class="w-full"
              label="Date"
              @click="togglePopover"
              readonly
              v-model.trim="dateText"
              :disabled="isLoading"
              @keydown.enter="submit"
            >
              <md-icon slot="leading-icon" v-html="icon('event', true)" />
            </md-filled-text-field>
          </template>
        </DatePicker>

        <DatePicker
          mode="time"
          v-model="startTime"
          :is-dark="store.isDark"
          class="inline-block"
          color="purple"
          popover
        >
          <template #default="{ togglePopover }">
            <md-filled-text-field
              class="w-full"
              label="Start time"
              @click="togglePopover"
              readonly
              :disabled="!date || isLoading"
              :value="startTimeText"
              @keydown.enter="submit"
            >
              <md-icon slot="leading-icon" v-html="icon('event', true)" />
            </md-filled-text-field>
          </template>
        </DatePicker>

        <DatePicker
          mode="time"
          v-model="endTime"
          :is-dark="store.isDark"
          class="inline-block"
          color="purple"
          popover
        >
          <template #default="{ togglePopover }">
            <md-filled-text-field
              class="w-full"
              label="End time"
              @click="togglePopover"
              readonly
              :disabled="!date || isLoading"
              :value="endTimeText"
              @keydown.enter="submit"
            >
              <md-icon slot="leading-icon" v-html="icon('event', true)" />
            </md-filled-text-field>
          </template>
        </DatePicker>
      </div>

      <!-- Hidden for now  -->
      <!-- <input @change="onFilePut" type="file" class="mt-5 file-input" pattern="image/*" accept="image/*" /> -->
    </div>
    <div class="space-x-1" slot="actions">  
      <md-text-button @click="close" :disabled="isLoading">Cancel</md-text-button>
      <md-text-button @click="submit" :disabled="isLoading" autofocus>
        {{ event ? (isLoading ? "Updating..." : "Update") : (isLoading ? 'Adding...' : 'Add') }}
      </md-text-button>
    </div>
  </md-dialog>
</template>

<script lang="ts" setup>
import "@material/web/dialog/dialog";
import "@material/web/textfield/filled-text-field";
import 'v-calendar/style.css'

import { icon } from "~/utils/icon";
import { ref, computed, watch } from "vue";
import { DatePicker } from "v-calendar";
import { getHumanDate, getTime, toISODate, toISOTime } from "~/utils/date";
import { useStore } from "~/store";
import { Endpoints, makeRequest } from "~/network/request";
import { EventRequest } from "~/types/request";
import { toast } from "vue3-toastify";

let attributes = [
  {
    highlight: {
      color: 'purple',
      fillMode: 'outline'
    },
    popover: {
      label: 'Today',
      visibility: 'hover',
      placement: 'top'
    },
    dates: [new Date()]
  }
];

const emit = defineEmits(["update:modelValue", "done"]);
const props = defineProps<{
  modelValue: boolean,
  event?: EventModel
}>()

const store = useStore();
const isLoading = ref(false);
const isDialogOpen = computed(() => props.modelValue);

const dialog = ref();
const title = ref();
const description = ref();
const venue = ref();
const date = ref();
const startTime = ref();
const endTime = ref();
const thumbnail = ref();

const dateText = ref("");
const startTimeText = ref("");
const endTimeText = ref("");

watch(date, v => {
  dateText.value = v ? getHumanDate(v) : "";

  if (!startTime.value) {
    startTime.value = new Date();
    startTime.value.setHours(8, 0);
  }

  if (!endTime.value) {
    endTime.value = new Date();
    endTime.value.setHours(12, 0);
  }
});

watch(startTime, v => {
  startTimeText.value = getTime(v);
});

watch(endTime, v => {
  endTimeText.value = getTime(v);
});

// Mausab najud
watch(isDialogOpen, v => {
  setTimeout(() => {
    dialog.value.shadowRoot.querySelector(".scroller").setAttribute("style", "overflow: visible;");
    dialog.value.shadowRoot.querySelector(".container").setAttribute("style", "overflow: visible;");
  }, 0);

  if (v) {
    title.value = props.event?.title;
    description.value = props.event?.description;
    venue.value = props.event?.venue;
    date.value = props.event?.date ? new Date(props.event?.date) : undefined;

    if (props.event?.start_time) {
      const chunks = props.event?.start_time.split(":");
      const hours = parseInt(chunks[0]);
      const minutes = parseInt(chunks[1]);

      startTime.value = new Date(props.event?.date);
      startTime.value.setHours(hours, minutes);
    }

    if (props.event?.end_time) {
      const chunks = props.event?.end_time.split(":");
      const hours = parseInt(chunks[0]);
      const minutes = parseInt(chunks[1]);

      endTime.value = new Date(props.event?.date);
      endTime.value.setHours(hours, minutes);
    }

    if (!props.event) {
      startTimeText.value = "";
      endTimeText.value = "";
    }
  }
});

function submit() {
  // If already loading, return
  if (isLoading.value) return;
  isLoading.value = true;

  const data: EventRequest = {
    title: title.value,
    description: description.value,
    venue: venue.value,
    date: toISODate(date.value),
    start_time: toISOTime(startTime.value),
    end_time: toISOTime(endTime.value),
  };

  // If thumbnail is set, append it to the data
  if (thumbnail.value) {
    data.thumbnail = thumbnail.value;
  }

  if (props.event) {
    data.id = props.event.id;
  }

  // Send the request
  makeRequest(props.event ? "PUT" : "POST", props.event ? Endpoints.EventsId : Endpoints.Events, data, response => {
    // Set loading to false
    isLoading.value = false;
    store.isLoading = false;

    // If success
    if (response.success) {
      toast.success(response.message);
      emit("done");
      close();
      return;
    }

    // Otherwise, show error
    toast.error(response.message);
  });
}

// function onFilePut(event: Event) {
//   const file = (event.target as HTMLInputElement).files?.[0];
//   if (!file) {
//     thumbnail.value = undefined;
//     return;
//   }
//   thumbnail.value = file;
// }

/**
 * Close the dialog
 */
function close() {
  setTimeout(() => {
    title.value = "";
    description.value = "";
    venue.value = "";
    date.value = undefined;
    startTime.value = "";
    endTime.value = "";
    dateText.value = "";
  }, 50);

  emit("update:modelValue", false);
}
</script>

<style lang="scss" scoped>
.file-input {
  @apply bg-surface-container-highest file:bg-surface-container py-2 pl-2;
}
</style>

<style lang="scss">
.vc-light {
  --vc-bg: var(--md-sys-color-surface-container);
}

.vc-dark {
  --vc-bg: var(--md-sys-color-surface-container);
  --vc-color: var(--md-sys-color-on-surface);
  --vc-popover-content-bg: var(--md-sys-color-surface-variant);
  --vc-day-content-disabled-color: var(--md-sys-color-surface-variant);
  
  &.vc-popover-content {
    border: none;
  }
}

/* Replace blue with sky blue palette */
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