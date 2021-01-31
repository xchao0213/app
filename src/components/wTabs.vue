<template>
  <div class="w-tabs">
    <van-tabs v-if="data.items.length > 0" sticky>
      <van-tab v-for="item in data.items" :title="item" :key="item">
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'wTabs',
  props: {
    data: {
      type: Object
    }
  }
}
</script>

<style>

</style>