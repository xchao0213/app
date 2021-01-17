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
      <div class="phone van-hairline--left">
        <van-icon name="phone" size="18" />
      </div>
      <div class="wechat van-hairline--left">
        <van-icon name="wechat" size="18" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wPlace',
  props: {
    data: {
      type: Object
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