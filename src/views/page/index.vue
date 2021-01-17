<template>
  <div class="page">
    <div v-for="section in pageData" :key="section.id">
      <template v-if="Array.isArray(section.value)">
        <component :is="'w-' + section.type" :data="content" v-for="content in section.value" :key="content.id"></component>
      </template>
      <template v-else>
        <component :is="'w-' + section.type" :data="section.value"></component>
      </template>
      
    </div>
    <!-- <van-button type="primary">主要按钮</van-button> -->
  </div>
</template>

<script>
import { Button } from 'vant';
import wTitle from '../../components/wTitle.vue';
import wPlace from '../../components/wPlace.vue';
import wFooter from '../../components/wFooter.vue';
export default {
  name: 'page',
  components: {
    [Button.name]: Button,
    wTitle,
    wPlace,
    wFooter
  },
  data() {
    return {
      pageData: [
        {
          type: 'title',
          id: 'fasfa',
          value: {
            text: '上海市新冠病毒核酸检测采样机构',
            author: '上海市卫生健康委员会 上海市中医药管理局',
            createdAt: '',
            readCount: 0,
            abstract: '上海市公布的最新核酸检测采样机构，摘自上海市卫生健康委员会网站。'
          }
        },
        {
          type: 'place',
          id: 'fwefwf',
          value: [
            {
              id: '3243',
              name: '东方医院(本部)',
              address: '即墨路150号',
              province: '',
              city: '',
              county: '',
              tag: '浦东',
              wechat: '',
              phone: '021-61569338'
            }
          ]
        },
        {
          type: 'footer'
        }
      ],
    }
  }
}
</script>

<style lang="less">
.page{
  padding: 24px 16px 16px;
  background: #fff;
}
</style>