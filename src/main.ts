import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'
import VWave from "v-wave";

import router from './router'

import '~/scss/main.scss'

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(VWave, {
  duration: 0.21
});

app.mount('#app')
