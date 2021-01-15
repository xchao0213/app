import {getJsConfig} from '../api/wechat';

let bridge = function () {
  return {
    initSDK(app, callback) {
      const params = {
        url: window.location.href
      }
      const jsApiList = ['scanQRCode']
      getJsConfig(params).then(res => {
        // vm.$dialog.alert({
        //   message: res.signature,
        // });
        app.$wechat.config({
          debug: true,
          appId: res.app_id,
          timestamp: res.timestamp,
          nonceStr: res.nonce_str,
          signature: res.signature,
          jsApiList
        })

        app.$wechat.ready(() => {
          callback && callback()
        })

        app.$wechat.error(err=> {
          console.log(err)
        })
        
      })
    },
    // getEnv(app, callback) {
    //   app.$wechat.miniProgram.getEnv(function (res) {
    //     callback && callback(res)
    //   })
    // },
    // scanQrcode(app, callback){
    //   app.$wechat.scanQRCode({
    //     needResult: 1,
    //     scanType: ['qrCode'],
    //     success(res) {
    //       return callback(res.resultStr)
    //     }
    //   })
    // }
  }
}()

bridge.install = (app) => {
  app.config.globalProperties.$bridge = bridge;
}

export default bridge;