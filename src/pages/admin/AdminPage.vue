<template>
  <div class="h-full">
    <div>
      <div class="flex justify-center mt-5 h-full">
        <Transition name="slide-fade" mode="out-in">
          <TabDashboard v-if="store.selectedRail === 'dashboard'" />
          <TabAnnouncements v-else-if="store.selectedRail === 'announcements'" />
          <TabEvents v-else-if="store.selectedRail === 'events'" />
          <TabProducts v-else-if="store.selectedRail === 'products'" />
          <TabStudents v-else-if="store.selectedRail === 'students'" />
          <TabOrders v-else-if="store.selectedRail === 'orders'" />
          <TabSettings v-else-if="store.selectedRail === 'settings'" />  
          <TabEnvironment v-else-if="store.selectedRail === 'env'" />
  
          <div class="flex justify-center items-center" v-else>
            Tab not found!
          </div>
        </Transition>
      </div>
    </div>
  </div>  
</template>

<script lang="ts" setup>
import { watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "~/store";

import "@material/web/tabs/tabs";
import "@material/web/icon/icon";
import "@material/web/tabs/secondary-tab";

import TabOrders from "./tabs/TabOrders.vue";
import TabStudents from "./tabs/TabsStudents.vue";
import TabDashboard from "./tabs/TabDashboard.vue";
import TabSettings from "./tabs/TabSettings.vue";
import TabEnvironment from "./tabs/TabEnvironment.vue";
import TabAnnouncements from "./tabs/TabAnnouncements.vue";
import TabEvents from "./tabs/TabEvents.vue";
import TabProducts from "./tabs/TabProducts.vue";

const router = useRouter();
const store = useStore();

store.rails = [
  { id: "dashboard", icon: "dashboard", title: "Dashboard" },
  { id: "announcements", icon: "campaign", title: "Announce" },
  { id: "events", icon: "event", title: "Events" },
  { id: "products", icon: "deployed_code", title: "Products" },
  { id: "students", icon: "groups", title: "Students" },
  { id: "orders", icon: "shopping_cart", title: "Orders" },
  { id: "env", icon: "tune", title: "Variables" },
  { id: "settings", icon: "settings", title: "Settings" },
];

// Set selected rail
store.selectedRail = router.currentRoute.value.params.tab as string;

watch(() => store.selectedRail,  v => {
  router.push({ name: "Admin", params: { tab: v } });
});
</script>

<style lang="scss" scoped>
md-tabs {
  --md-secondary-tab-container-shape: 6px;

  &::part(divider) {
    @apply hidden;
  }
}
</style>