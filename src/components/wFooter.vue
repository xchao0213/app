<template>
  <div class="w-footer">
    <van-button plain hairline round icon="good-job-o" size="small" @click="like">{{count}}赞</van-button>
    <van-button plain hairline round icon="share-o" size="small" @click="share">分享</van-button>
  </div>
</template>

<script>
export default {
  name: 'wFooter',
  data() {
    return {
      count: 0
    }
  },
  methods: {
    like() {
      this.count = this.count + 100;
    },
    share() {
      this.count = this.count - 100;
      this.$bridge.postMessage('点了分享');
    }
  }
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