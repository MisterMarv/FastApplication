import { createApp } from 'vue';
import Notifications from '@kyvg/vue3-notification'
import App from './App.vue';
import router from './router';
import axios from 'axios';

const app = createApp(App);
app.use(router);
app.use(Notifications);
app.config.globalProperties.$axios = axios;

app.mount('#app');