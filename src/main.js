import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/router";
import store from "@/store";
import {vue3Debounce} from "vue-debounce";

const app = createApp(App)

app
    .use(store)
    .use(router)
    .directive('debounce', vue3Debounce({ lock: true }))
    .mount('#app')
