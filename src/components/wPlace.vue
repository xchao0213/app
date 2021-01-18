<template>
  <div class="w-place shadow">
    <div class="top-right">
      <van-tag type="primary">{{data.tag}}</van-tag>
    </div>
    <p class="name">{{data.name}}</p>
    <div class="contact flex-box">
      <div class="address" @click="openMap">
        <!-- <van-icon name="location" size="18" /> -->
        {{data.address}}
        <van-icon name="arrow" size="14" />
      </div>
      <div class="phone" @click="toggleSheet(true)">
        <van-icon name="phone" size="18" />
      </div>
      <div class="wechat" @click="toggleWechat(true)">
        <van-icon name="wechat" size="18" />
      </div>
    </div>
    <van-action-sheet
      v-model:show="show"
      :actions="actions"
      cancel-text="取消"
      description="联系电话"
      close-on-click-action
    />
    <van-popup v-model:show="showWechat" round>
      <div class="content">
        <img class="qrcode" :src="data.wechat" alt="wechat">
        <p>长按图片识别二维码</p>
      </div>
    </van-popup>
    <!-- <van-action-sheet v-model:show="showWechat" title="微信号">
      
    </van-action-sheet> -->
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'wPlace',
  props: {
    data: {
      type: Object
    }
  },
  setup(props) {
    const show = ref(false);
    const showWechat = ref(true);
    const {phone, phoneRemark} = props.data;
    const actions = [
      { name: `机构电话: ${phone}`, subname: phoneRemark },
    ];

    function toggleSheet(val) {
      show.value = val
    }
    function toggleWechat(val) {
      showWechat.value = val
    }

    return {
      show,
      showWechat,
      actions,
      toggleSheet,
      toggleWechat
    };
  },
  methods: {
    openMap() {
      this.$bridge.openLocation({
        latitude: this.data.location.lat,
        longitude: this.data.location.lng,
        name: this.data.name,
        address: this.data.address, 
      })
    }
  }
}
</script>

<style lang='less'>
.w-place{
  position: relative;
  // width: 100%;
  color: #666;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 16px;
  .top-right{
    position: absolute;
    right: 5px;
    top: 5px;
  }
  .name{
    color: #333;
    font-size: 20px;
    font-weight: 500;
    padding-bottom: 15px;
  }
  .contact{
    margin-top: 5px;
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