import {wx} from './jweixin-1.6.0';

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

    }
  }
}()

export default wechat;