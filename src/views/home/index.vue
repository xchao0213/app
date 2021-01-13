<template>
  <div class="home">
    home
  </div>
</template>

<script>
export default {
  name: 'home',
  mounted() {
    this.$wechat.getEnv(function (res) {
      console.log(res)
    })
  }
}
</script>

<style>

</style>