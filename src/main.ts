import { createApp } from 'vue'
import { createPinia } from "pinia";
import { inject } from '@vercel/analytics';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import "element-internals-polyfill";

import App from './App.vue'
import router from './router'

import 'vue3-toastify/dist/index.css'
import 'sal.js/dist/sal.css'
import '~/scss/main.scss'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.use(Vue3Toastify, {
  position: 'bottom-left',
  clearOnUrlChange: false,
} as ToastContainerOptions);

inject({
  debug: process.env.NODE_ENV === 'development',
});

app.mount('#app')
