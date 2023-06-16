<template>
  <div class="h-full">
    <VAppBar />

    <router-view v-slot="{ Component }">
      <div class="p-4">
        <Transition name="slide-fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </div>
    </router-view>

  </div>
</template>

<script lang="ts" setup>
import VAppBar from './components/VAppBar.vue';
</script>