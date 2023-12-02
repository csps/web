<template>
  <div class="h-full">
    <div class="md:container mx-auto md:px-6 block md:hidden">
      <div class="overflow-x-scrol hide-scrollbarl">
        <md-tabs :selected="tabs.findIndex(t => t.id === route.params.tab)">
          <md-primary-tab v-for="t in tabs" :key="t.title" @click="tab = t.id">
            <md-icon slot="icon" v-html="icon(t.icon)" />
            {{ t.title }}
          </md-primary-tab>
        </md-tabs>
      </div>
    </div>

    <div>
      <div class="flex justify-center mt-5 h-full md:pl-[80px] transition-[padding_0.21s_ease_in_out]">
        <Transition name="slide-fade" mode="out-in">
          <TabDashboard v-if="route.params.tab === 'dashboard'" />
          <TabAnnouncements v-else-if="route.params.tab === 'announcements'" />
          <TabEvents v-else-if="route.params.tab === 'events'" />
          <TabProducts v-else-if="route.params.tab === 'products'" />
          <TabStudents v-else-if="route.params.tab === 'students'" />
          <TabOrders v-else-if="route.params.tab === 'orders'" />
          <TabSettings v-else-if="route.params.tab === 'settings'" />  
          <TabEnvironment v-else-if="route.params.tab === 'env'" />
  
          <div class="flex justify-center items-center" v-else>
            Tab not found!
          </div>
        </Transition>
      </div>
    </div>
  </div>  
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "~/store";
import { removeStore } from "~/utils/storage";
import { Icon, icon } from "~/utils/icon";

import "@material/web/tabs/tabs";
import "@material/web/icon/icon";
import "@material/web/tabs/primary-tab";

import TabOrders from "./tabs/TabOrders.vue";
import TabStudents from "./tabs/TabsStudents.vue";
import TabDashboard from "./tabs/TabDashboard.vue";
import TabSettings from "./tabs/TabSettings.vue";
import TabEnvironment from "./tabs/TabEnvironment.vue";
import TabAnnouncements from "./tabs/TabAnnouncements.vue";
import TabEvents from "./tabs/TabEvents.vue";
import TabProducts from "./tabs/TabProducts.vue";

type Tab = {
  id: string;
  icon: Icon;
  title: string;
};

const route = useRoute();
const router = useRouter();
const store = useStore();
const tabs: Tab[] = [
  { id: "dashboard", icon: "dashboard", title: "Dashboard" },
  { id: "announcements", icon: "campaign", title: "Announce" },
  { id: "events", icon: "event", title: "Events" },
  { id: "products", icon: "deployed_code", title: "Products" },
  { id: "students", icon: "groups", title: "Students" },
  { id: "orders", icon: "shopping_cart", title: "Orders" },
  { id: "env", icon: "tune", title: "Variables" },
  { id: "settings", icon: "settings", title: "Settings" },
];

const tab = ref(route.params.tab);
// Set tabs
store.rails = tabs;
// Set selected rail
store.selectedRail = router.currentRoute.value.params.tab as string;

watch(() => store.selectedRail, tab => {
  removeStore("tabs_orders_page");
  router.push({ name: "Admin", params: { tab }});
});

watch(tab, tab => {
  removeStore("tabs_orders_page");
  router.push({ name: "Admin", params: { tab }});
});
</script>

<style lang="scss" scoped>
md-tabs {
  --md-primary-tab-container-shape: 6px;

  &::part(divider) {
    @apply hidden;
  }
}
</style>