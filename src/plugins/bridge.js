import {getJsConfig} from '../api/wechat';

let bridge = function () {
  let vm;
  return {
    initSDK(app, callback) {
      vm = app;
      const params = {
        url: window.location.href.split('#')[0]
      }
      const jsApiList = ['scanQRCode']
      getJsConfig(params).then(res => {
        // vm.$dialog.alert({
        //   message: res.signature,
        // });
        vm.$wechat.config({
          debug: true,
          appId: res.app_id,
          timestamp: res.timestamp,
          nonceStr: res.nonce_str,
          signature: res.signature,
          jsApiList
        })

        vm.$wechat.ready(() => {
          callback && callback()
        })

        vm.$wechat.error(err=> {
          console.log(err)
        })
        
      })
    },
    getEnv(callback) {
      vm.$wechat.miniProgram.getEnv(function (res) {
        callback && callback(res)
      })
    },
    scanQrcode(callback){
      vm.$wechat.scanQRCode({
        needResult: 1,
        scanType: ['qrCode'],
        success(res) {
          return callback(res.resultStr)
        }
      })
    }
  }
}()

bridge.install = (app) => {
  app.config.globalProperties.$bridge = bridge;
}

export default bridge;