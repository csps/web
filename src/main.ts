import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'
import '~/scss/main.scss'

import router from './router'

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.mount('#app')
