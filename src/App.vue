<template>
  <div class="h-full">
    <VAppBar />

    <router-view v-slot="{ Component }">
      <Transition name="slide-fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>

  </div>
</template>

<script lang="ts" setup>
import VAppBar from './components/VAppBar.vue';
</script>