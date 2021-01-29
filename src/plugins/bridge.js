import {getJsConfig} from '../api/wechat';

let bridge = function () {
  let vm;
  return {
    initSDK(app, callback) {
      vm = app;
      const params = {
        url: window.location.href.split('#')[0]
      }
      const jsApiList = ['scanQRCode', 'openLocation']
      getJsConfig(params).then(res => {
        // vm.$dialog.alert({
        //   message: res.signature,
        // });
        vm.$wechat.config({
          debug: false,
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
    },
    postMessage(message) {
      vm.$wechat.miniProgram.postMessage({
        data: message
      })
    },
    openLocation(params) {
      vm.$wechat.openLocation({
        latitude: params.latitude, // 纬度，浮点数，范围为90 ~ -90
        longitude: params.longitude, // 经度，浮点数，范围为180 ~ -180。
        name: params.name, // 位置名
        address: params.address, // 地址详情说明
        scale: 10, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
      });
    },
    getLocation(callback) {
      vm.$wechat.getLocation({
        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          return callback(res)
          // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          // var speed = res.speed; // 速度，以米/每秒计
          // var accuracy = res.accuracy; // 位置精度
        }
      });
      
      
    }
  }
}()

bridge.install = (app) => {
  app.config.globalProperties.$bridge = bridge;
}

export default bridge;