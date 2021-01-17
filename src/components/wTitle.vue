<template>
  <div class="w-title">
    <p class="title">{{data.text}}</p>
    <div class="meta flex-box">
      <div>
        <span class="author">早安君</span>
        <span class="time">昨天 17:12</span>
      </div>
      <span class="count">阅读 2453</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wTitle',
  props: {
    data: {
      type: Object
    }
  }
}
</script>

<style lang='less'>
.w-title{
  .title{
    font-size: 25px;
    font-weight: 500;
  }
  .meta{
    font-size: 14px;
    margin: 12px 0;
    color: #999;
    .author{
      margin-right: 6px;
      color: #576b95;
    }
  }
}
</style>