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
    initSDK() {
      const params = {
        url: window.location.href
      }
      getJsConfig(params).then(res => {
        
      })
    }
  }
}()

export default wechat;