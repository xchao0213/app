import {getJsConfig} from '../api/wechat';

let bridge = function () {
  return {
    initSDK(callback) {
      const params = {
        url: window.location.href
      }
      const jsApiList = ['scanQRCode']
      getJsConfig(params).then(res => {
        // vm.$dialog.alert({
        //   message: res.signature,
        // });
        wx.config({
          debug: true,
          appId: res.app_id,
          timestamp: res.timestamp,
          nonceStr: res.nonce_str,
          signature: res.signature,
          jsApiList
        })

        wx.ready(() => {
          callback && callback()
        })

        wx.error(err=> {
          console.log(err)
        })
        
      })
    },
    getEnv(callback) {
      wx.miniProgram.getEnv(function (res) {
        callback && callback(res)
      })
    },
    scanQrcode(callback){
      wx.scanQRCode({
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