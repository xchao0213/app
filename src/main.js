import { createApp } from 'vue';
import { Toast, Dialog, Icon, Button, Tag, ActionSheet, Popup, Rate, Tab, Tabs, Sticky, List, PullRefresh } from 'vant';
// 移动端适配
import 'lib-flexible/flexible.js'
// import VConsole from 'vconsole'
import App from './App.vue';
import router from './router';
import 'vant/lib/index.css';
import './style/style.less';

// import wechat from './plugins/wechat';
// import bridge from './plugins/bridge';
const app = createApp(App);
// app.use(wechat);
// app.config.globalProperties.$wechat = wx;
// app.use(bridge);

app.use(Toast);
app.use(Dialog);
app.use(Icon);
app.use(Button);
app.use(Tag);
app.use(ActionSheet);
app.use(Popup);
app.use(Rate);
app.use(Tab);
app.use(Tabs);
app.use(Sticky);
app.use(List);
app.use(PullRefresh);
app.use(router).mount('#app');
