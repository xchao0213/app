import {wx} from './jweixin-1.6.0';
import {getJsConfig} from '../api/wechat';

let wxJS = wx;

const wechat = function () {

  return {
      /**
     * 
     */
    getEnv(callback) {
      wxJS.miniProgram.getEnv(function (res) {
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
        wxJS.config({
          debug: true,
          appId: res.app_id,
          timestamp: res.timestamp,
          nonceStr: res.nonce_str,
          signature: res.signature,
          jsApiList
        })

        wxJS.ready(() => {
          callback && callback()
        })
        
      })
    },
    scanQrcode(callback){
      wxJS.scanQRCode({
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