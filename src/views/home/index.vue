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
    // this.$wechat.getEnv(function (res) {
    //   this.$toast(res)
    // })
    this.$wechat.initSDK(function (){
      this.$toast('initSDK ok')
    })
  },
  methods: {
    scan() {
      this.$wechat.scanQrcode(function(res) {
        this.$toast(res)
      })
    }
  }
}
</script>

<style>

</style>