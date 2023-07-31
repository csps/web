import { createApp } from 'vue'
import { createPinia } from "pinia";
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';

import App from './App.vue'
import router from './router'

import 'vue3-toastify/dist/index.css';
import 'sal.js/dist/sal.css'
import '~/scss/main.scss'

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.use(Vue3Toastify, {
  limit: 5,
  position: 'bottom-right',
  transition: 'flip',
} as ToastContainerOptions);

app.mount('#app')
