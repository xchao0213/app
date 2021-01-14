import {wx} from './jweixin-1.6.0';

let wechat = {}

wechat.install = (app) => {
  app.config.globalProperties.$wechat = wx;
}

export default wechat;