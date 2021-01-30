import { wx } from '../../plugins/jweixin-1.6.0'; 
import { getJsConfig } from '../../api/wechat';

export function useWx () {

  const initSDK = () => {
    return new Promise ((resolve, reject) => {
      const params = {
        url: window.location.href.split('#')[0]
      }
      const jsApiList = ['scanQRCode', 'openLocation', 'getLocation']
      getJsConfig(params).then(res => {
        wx.config({
          debug: true,
          appId: res.app_id,
          timestamp: res.timestamp,
          nonceStr: res.nonce_str,
          signature: res.signature,
          jsApiList
        })
        wx.ready(() => {
          resolve()
        })
        wx.error(err=> {
          reject(err)
        })
        
      })
    })
  }

  // const getEnv = () => {
  //   return new Promise((resolve, reject) => {
  //     wx.miniProgram.getEnv(function (res) {
  //       resolve(res)
  //     })
  //   })
  // },
  // const scanQrcode = () => {
  //   return new Promise((resolve, reject) => {
  //     wx.scanQRCode({
  //       needResult: 1,
  //       scanType: ['qrCode'],
  //       success(res) {
  //         resolve(res.resultStr)
  //       }
  //     })
  //   })
  // },
  // const postMessage = (message) => {
  //   wx.miniProgram.postMessage({
  //     data: message
  //   })
  // },
  // const openLocation = (params) =>{
  //   wx.openLocation({
  //     latitude: params.latitude, // 纬度，浮点数，范围为90 ~ -90
  //     longitude: params.longitude, // 经度，浮点数，范围为180 ~ -180。
  //     name: params.name, // 位置名
  //     address: params.address, // 地址详情说明
  //     scale: 10, // 地图缩放级别,整形值,范围从1~28。默认为最大
  //     infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
  //   });
  // },
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          resolve(res)
          // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          // var speed = res.speed; // 速度，以米/每秒计
          // var accuracy = res.accuracy; // 位置精度
        }
      });
    })
  }
    
  return {
    initSDK,
    // getEnv,
    // scanQrcode,
    // postMessage,
    getLocation,
    // openLocation
  };
};
