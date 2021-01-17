<template>
  <div class="w-place shadow">
    <div class="top-right">
      <van-tag type="primary">{{data.tag}}</van-tag>
    </div>
    <p class="name">{{data.name}}</p>
    <div class="contact flex-box">
      <div class="address">
        <van-icon name="location" size="18" />{{data.address}}
      </div>
      <div class="phone" @click="toggleSheet(true)">
        <van-icon name="phone" size="18" />
      </div>
      <div class="wechat">
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
    const {phone} = props.data
    const actions = [
      { name: `商家电话: ${phone}` },
    ];

    function toggleSheet(val) {
      show.value = val
    }

    return {
      show,
      actions,
      toggleSheet
    };
  },
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
    }
    .phone{
      padding-right: 5px;
    }
    .phone, .wechat{
      width: 18px;
      padding-left: 5px;
    }
  }
}
</style>