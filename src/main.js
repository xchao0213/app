import { createApp } from 'vue';
import { Toast, Dialog } from 'vant';
// import VConsole from 'vconsole'
import App from './App.vue';
import router from './router';
import 'vant/lib/index.css';

import wechat from './plugins/wechat';
import bridge from './plugins/bridge';

const app = createApp(App);
app.use(wechat);
app.use(bridge);

app.use(Toast);
app.use(Dialog);
app.use(router).mount('#app');
