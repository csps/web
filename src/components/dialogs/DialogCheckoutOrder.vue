<template>
  <md-dialog
    :open="isDialogOpen"
    @close="close"
    :scrim-click-action="''"
    :escape-key-action="''"
  >
    <div slot="headline">Checkout Order</div>
    <div slot="icon">
      <md-icon v-html="icon('shopping_cart_checkout')" />
    </div>
    <div slot="content">
      <div class="flex justify-center gap-3">
        <md-filter-chip
          :selected="mop === ModeOfPayment.WALK_IN"
          @click="mop = ModeOfPayment.WALK_IN"
          label="Walk-in"
        >
          <md-icon slot="icon" v-html="icon('footprint', true)" />
        </md-filter-chip>
        <md-filter-chip
          :selected="mop === ModeOfPayment.GCASH"
          @click="mop = ModeOfPayment.GCASH"
          label="GCash"
        >
          <md-icon slot="icon" v-html="icon('qr_code', true)" />
        </md-filter-chip>
      </div>
    </div>
    <div class="space-x-1" slot="actions">
      <md-text-button @click="close" :disabled="isLoading">Cancel</md-text-button>
      <md-text-button @click="placeOrder" :disabled="isLoading" autofocus>
        {{ isLoading ? "Placing order..." : "Place order" }}
      </md-text-button>
    </div>
  </md-dialog>
</template>

<script lang="ts" setup>
import "@material/web/dialog/dialog";
import "@material/web/chips/filter-chip";
import "@material/web/textfield/outlined-text-field";

import { icon } from "~/utils/icon";
import { ref, computed } from "vue";
import { ModeOfPayment } from "~/types/enums";
import { useStore } from "~/store";
// import { toast } from "vue3-toastify";
// import { Endpoints, makeRequest } from "~/network/request";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const isLoading = ref(false);
const isDialogOpen = computed(() => props.modelValue);

const store = useStore();
const mop = ref(ModeOfPayment.WALK_IN);

/**
 * Place Order 
 */
function placeOrder() {

  console.log(store.student);

  // If already loading, return
  // if (isLoading.value) return;
  // isLoading.value = true;



  // // If student ID length is not 8 or contains non-numeric characters
  // if (studentID.value.length !== 8 || !/^\d+$/.test(studentID.value)) {
  //   toast.info("Invalid student ID");
  //   isLoading.value = false;
  //   return;
  // }

  // // Send the request
  // makeRequest("POST", Endpoints.ForgotPassword, { 
  //   student_id: studentID.value
  // }, response => {
  //   // Set loading to false
  //   isLoading.value = false;

  //   // If success
  //   if (response.success) {
  //     toast.success(response.message);
  //     close();
  //     return;
  //   }

  //   // Otherwise, show error
  //   toast.error(response.message);
  // });
}

/**
 * Close the dialog
 */
function close() {
  emit("update:modelValue", false);
}
</script>