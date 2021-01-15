<template>
  <div class="home">
    home
    <van-button @click="scan">Scan</van-button>
  </div>
</template>

<script>
import { Button } from 'vant';
export default {
  name: 'home',
  components: {
    [Button.name]: Button
  },
  mounted() {
    this.$toast('on home mounted')
    let _this = this;
    // this.$wechat.getEnv(function (res) {
    //   this.$toast(res)
    // })
    console.log(this.$bridge)
    this.$bridge.initSDK(this,function (){
      _this.$toast('initSDK ok')
    })
  },
  methods: {
    scan() {
      this.$$bridge.scanQrcode(function (res){
        console.log(res)
      })
    }
  }
}
</script>

<style>

</style>