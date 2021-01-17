<template>
  <div class="w-footer">
    <van-button plain hairline round icon="good-job-o" size="small">10000赞</van-button>
    <van-button plain hairline round icon="share-o" size="small">分享</van-button>
  </div>
</template>

<script>
export default {
  name: 'wFooter'
}
</script>

<style lang="less">
.w-footer{
  display: flex;
  justify-content: space-around;
  align-items: center;
  .van-button--small{
    padding: 0 15px;
  }
}
</style>