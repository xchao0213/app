<template>
  <div class="w-place shadow">
    <div class="top-left">
      <van-tag type="primary">{{data.countyName}}</van-tag>
    </div>
    <p class="name">{{data.orgName}}</p>
    <!-- <van-rate /> -->
    <div class="contact flex-box">
      <div class="address" @click="openMap">
        <!-- <van-icon name="location" size="18" /> -->
        {{data.orgAddress}}{{distanceH}}
        <van-icon name="arrow" size="14" />
      </div>
      <div class="phone" @click="toggleSheet(true)">
        <van-icon name="phone" size="18" />
      </div>
      <!-- <div class="wechat" v-on:click="$emit('showSheet')">
        <van-icon name="wechat" size="18" />
      </div> -->
    </div>
    
    <van-popup v-model:show="showWechat" round>
      <div class="content">
        <img class="qrcode" :src="data.wechat" alt="wechat">
        <p v-if="env">因小程序限制，请将二维码保存至相册后扫码</p>
        <p v-else>长按图片识别二维码</p>
      </div>
    </van-popup>
    <!-- <van-action-sheet v-model:show="showWechat" title="微信号">
      
    </van-action-sheet> -->
  </div>
</template>

<script>
import { ref } from 'vue';
import { useWx } from '../use/useWx';

export default {
  name: 'wPlace',
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      env: ''
    }
  },
  computed: {
    distanceH() {
      return ` 距${this.data.distance.toFixed(1)}km`
    }
  },
  emits: ['showSheet'],
  setup(props, { emit }) {
    const showWechat = ref(false);
    const data = props.data;
    // const userGeolocation = inject('geolocation')
    const { initSDK, openLocation } = useWx();

    let actions = []
    if (props.data) {
      const {phone, serviceTime} = props.data;
      actions = [
        { name: `咨询电话: ${phone}`, subname: serviceTime },
      ];
    }

    function toggleSheet(val) {
      emit('showSheet', actions)
    }
    function toggleWechat(val) {
      showWechat.value = val
    }

    function openMap() {
      console.log(data)
      openLocation({
        latitude:  data.lat,
        longitude: data.lng,
        name: data.orgName,
        address: data.orgAddress, 
      })
    
    }

    return {
      showWechat,
      actions,
      toggleSheet,
      toggleWechat,
      openMap
      // userGeolocation
    };
  }
}
</script>

<style lang='less'>
.w-place{
  position: relative;
  // width: 100%;
  color: #666;
  border-radius: 6px;
  padding: 24px 16px 16px;
  margin-top: 16px;
  .top-left{
    position: absolute;
    left: 5px;
    top: 5px;
  }
  .name{
    color: #333;
    font-size: 20px;
    font-weight: 500;
    padding-bottom: 5px;
  }
  .contact{
    margin-top: 15px;
    .address{
      flex: 1;
      display: flex;
      align-items: center;
      font-size: 14px;
    }
    .phone{
      padding-right: 10px;
    }
    .phone, .wechat{
      width: 18px;
      padding-left: 10px;
    }
  }
}
</style>