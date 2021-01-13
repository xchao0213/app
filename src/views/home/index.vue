<template>
  <div class="home">
    home
  </div>
</template>

<script>
export default {
  name: 'home',
  mounted() {
    this.$toast('on home mounted')
    this.$wechat.getEnv(function (res) {
      this.$toast(res)
    })
  }
}
</script>

<style>

</style>