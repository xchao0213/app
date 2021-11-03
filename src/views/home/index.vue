<template>
  <div class="home">
    home
    <van-button @click="onScan">Scan</van-button>
    <van-button @click="toPage">Page</van-button>
  </div>
</template>

<script>
import { useWx } from '../../use/useWx';
import { isWeixin } from '../../utils/index';
import {
  // provide,
  // nextTick,
  onMounted,
  // createCommentVNode,
} from 'vue';
import { Button } from 'vant';
export default {
  name: 'home',
  components: {
    [Button.name]: Button
  },
    setup(props, { emit, slots }) {
    const { 
      initSDK,
      getEnv,
      scanQrcode
      } = useWx();

      onMounted(async () => {
        try {
        if (isWeixin()) {
          console.log('isWeixin')
          await initSDK();
          const env = await getEnv();
          

        } else {
          console.log("not weixin")
        }

      } catch (e) {
        console.log(e)
      } finally {
      }
      })
      const onScan = () => {
       scanQrcode().then(res => {
         console.log(res)
       }).catch(err => {
         console.log(err)
       })
       
    }
    return { onScan }
    },
  // mounted() {
  //   this.$toast('on home mounted')
  //   let _this = this;
  //   // this.$wechat.getEnv(function (res) {
  //   //   this.$toast(res)
  //   // })
  //   console.log(this.$bridge)
  //   // this.$bridge.initSDK(this,function (){
  //   //   _this.$toast('initSDK ok')
  //   // })
  // },
  methods: {
    scan() {
      // this.$bridge.scanQrcode(function (res){
      //   console.log(res)
      // })
    },
    toPage() {
      this.$router.push('page')
    }
  }
}
</script>

<style>

</style>