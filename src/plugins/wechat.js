import wx from './plugins/jweixin-1.6.0';

let wechat = function () {

  /**
   * 
   */
  function getEnv(callback) {
    wx.miniProgram.getEnv(function (res) {
      callback && callback(res)
    })
  }

  /**
   * 
   */
  function initSDK() {

  }
}

export default wechat;
