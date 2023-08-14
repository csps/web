import { createApp } from 'vue'
import { createPinia } from "pinia";
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';

import App from './App.vue'
import router from './router'
import VTippy from 'vue-tippy';

import 'vue3-toastify/dist/index.css'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/dist/backdrop.css'
import 'tippy.js/animations/shift-away.css'
import 'sal.js/dist/sal.css'
import '~/scss/main.scss'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.use(VTippy, {
  directive: 'tippy',
  defaultProps: {
    animateFill: true
  },
});

app.use(Vue3Toastify, {
  position: 'bottom-left',
  limit: 5,
  newestOnTop: true,
} as ToastContainerOptions);

app.mount('#app')
