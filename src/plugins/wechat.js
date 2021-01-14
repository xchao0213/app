import {wx} from './jweixin-1.6.0';
import {getJsConfig} from '../api/wechat';

const wechat = function () {

  return {
      /**
     * 
     */
    getEnv(callback) {
      wx.miniProgram.getEnv(function (res) {
        callback && callback(res)
      })
    },

    /**
     * 
     */
    initSDK(callback) {
      const params = {
        url: window.location.href
      }
      const jsApiList = ['scanQRCode']
      getJsConfig(params).then(res => {
        console.log('res.signature', res.signature)
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

export default wechat;