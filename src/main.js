import { createApp } from 'vue';
import { Toast } from 'vant';
import App from './App.vue';
import router from './router';
import 'vant/lib/index.css';

import wechat from './plugins/wechat';

const app = createApp(App);
app.config.globalProperties.$wechat = wechat;

app.use(Toast);
app.use(router).mount('#app');
