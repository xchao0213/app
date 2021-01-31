<template>
  <div class="w-tabs">
    <van-sticky>
    <van-tabs v-if="data.items.length > 0" v-model:active="activeName" @click="onClick">
      <van-tab v-for="item in data.items" :title="item" :name="item" :key="item">
      </van-tab>
    </van-tabs>
    </van-sticky>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'wTabs',
  props: {
    data: {
      type: Object
    }
  },
  emits: ['change'],
  setup(props, {emit}) {
    const activeName = ref('a');

    const onClick = (e) => {
      emit('change', e)
    }

    return { activeName, onClick};
  },
}
</script>

<style>
.van-sticky--fixed{
  padding: 0 16px;
  background: #fff;
  box-shadow: 0 2px 2px rgba(0,0,0,.075);
}
</style>