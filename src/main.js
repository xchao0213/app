import { createApp } from 'vue';
import { Toast, Dialog, Icon, Button, Tag } from 'vant';
// 移动端适配
import 'lib-flexible/flexible.js'
// import VConsole from 'vconsole'
import App from './App.vue';
import router from './router';
import 'vant/lib/index.css';
import './style/style.less';

// import wechat from './plugins/wechat';
import { wx } from './plugins/jweixin-1.6.0'; 
import bridge from './plugins/bridge';
const app = createApp(App);
// app.use(wechat);
app.config.globalProperties.$wechat = wx;
app.use(bridge);

app.use(Toast);
app.use(Dialog);
app.use(Icon);
app.use(Button);
app.use(Tag);
app.use(router).mount('#app');
