<template>
  <div class="flex justify-center">
    Product #{{ route.params.id }}
  </div>  
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '~/store';

const store = useStore();
const route = useRoute();

onMounted(() => {
  store.isLoading = true;

  setTimeout(() => {
    store.isLoading = false;
  }, 500);
});
</script>