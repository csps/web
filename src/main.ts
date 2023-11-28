import { createApp } from 'vue'
import { createPinia } from "pinia";
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import "element-internals-polyfill";

import App from './App.vue'
import router from './router'

import 'vue3-toastify/dist/index.css'
import 'sal.js/dist/sal.css'
import '~/scss/main.scss'

const app = createApp(App);
const pinia = createPinia();

// TODO: Remove any when types are fixed  
 
app.use(pinia as any);
app.use(router as any);

app.use(Vue3Toastify as any, {
  position: 'bottom-right',
  clearOnUrlChange: false,
} as ToastContainerOptions);

app.mount('#app')
