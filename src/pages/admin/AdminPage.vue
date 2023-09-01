<template>
  <div class="h-full">
    <div class="container mx-auto px-6">
      <div class="overflow-x-scroll">
        <md-tabs :selected="tabs.findIndex(t => t.id === tab)">
          <md-tab v-for="t in tabs" :key="t.name" @click="tab = t.id">
            <md-icon slot="icon" v-html="icon(t.icon)" />
            {{ t.name }}
          </md-tab>
        </md-tabs>
      </div>
    </div>

    <div>

      <div class="flex justify-center mt-5 h-full">
        <Transition name="slide-fade" mode="out-in">
          <TabDashboard v-if="tab === 'dashboard'" />
          <TabStudents v-else-if="tab === 'students'" />
          <TabOrders v-else-if="tab === 'orders'" />
          <TabSettings v-else-if="tab === 'settings'" />  
          <TabEnvironment v-else-if="tab === 'env'" />
  
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
import { Icon, icon } from "~/utils/icon";

import "@material/web/tabs/tab";
import "@material/web/tabs/tabs";
import "@material/web/icon/icon";

import TabOrders from "./tabs/TabOrders.vue";
import TabStudents from "./tabs/TabsStudents.vue";
import TabDashboard from "./tabs/TabDashboard.vue";
import TabSettings from "./tabs/TabSettings.vue";
import TabEnvironment from "./tabs/TabEnvironment.vue";

type Tab = {
  id: string;
  name: string;
  component: any;
  icon: Icon;
};

const route = useRoute();
const router = useRouter();
const tabs: Tab[] = [
  { id: "dashboard", name: "Dashboard", component: TabDashboard, icon: "dashboard" },
  { id: "students",  name: "Students", component: TabStudents, icon: "groups" },
  { id: "orders",    name: "Orders", component: TabOrders, icon: "shopping_cart" },
  { id: "env",       name: "Environment Variables", component: TabOrders, icon: "tune" },
  { id: "settings",  name: "Settings", component: TabOrders, icon: "settings" },
];

const tab = ref(route.params.tab);

watch(tab, v => {
  router.push({ name: "Admin", params: { tab: v } });
});
</script>

<style lang="scss" scoped>
md-tabs {
  --md-primary-tab-container-shape: 6px;
}
</style>