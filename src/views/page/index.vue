<template>
  <div class="page">
    <div v-for="section in pageData" :key="section.id">
      <template v-if="Array.isArray(section.value)">
        <component :is="'w-' + section.type" :latitude="latitude" :longitude="longitude" :data="content" v-for="content in section.value" :key="content.id" v-on:showSheet="sayHi"></component>
      </template>
      <template v-else>
        <component :is="'w-' + section.type" :data="section.value" @change="onChange"></component>
      </template>
    </div>
    <!-- <van-button type="primary">主要按钮</van-button> -->
    <van-action-sheet
      v-model:show="show"
      :actions="state.actions"
      cancel-text="取消"
      description="联系电话"
      close-on-click-action
    />
  </div>
  
</template>

<script>
import { Button } from 'vant';
import { isWeixin } from '../../utils/index';
import {
  ref,
  // provide,
  // watch,
  // nextTick,
  onMounted,
  reactive,
  computed,
  // createCommentVNode,
} from 'vue';
import { useWx } from '../../use/useWx';

import { useRoute} from 'vue-router'
import welcomeButton from '../../components/welcomeButton.vue';
import wTitle from '../../components/wTitle.vue';
import wTabs from '../../components/wTabs.vue';
import wPlace from '../../components/wPlace.vue';
import wFooter from '../../components/wFooter.vue';
import { getPage, getPlaces } from '../../api/app';
import distance from '../../utils/distance';
import { uniKey } from '../../utils' 
export default {
  name: 'page',
  components: {
    [Button.name]: Button,
    wTitle,
    wTabs,
    wPlace,
    wFooter,
    welcomeButton
  },
  methods: {
    sayHi() {
      console.log('Hi!')
    }
  },
  setup(props, { emit, slots }) {
    const route = useRoute()
    const show = ref(false);
    const state = reactive({
      page: {},
      content: {},
      tabKey: '全部',
      // pageData: [],
      actions: [],
    })

    // const geolocation = reactive({
    //   longitude: 31.23,
    //   latitude: 121.47
    // })
    let geolocation = {
      longitude: 121.47,
      latitude: 31.23
    }

    const { initSDK, getEnv, getLocation } = useWx();
    // provide('geolocation', geolocation)

    const onShowSheet = (actions) => {
      console.log('page onShowSheet')
      state.actions = actions;
      show.value = true;
    }

    onMounted(async () => {
      const { id } = route.query;
      try {
        if (isWeixin()) {
          await initSDK();
          const env = await getEnv();
          const location = await getLocation();
          geolocation.longitude = location.longitude;
          geolocation.latitude = location.latitude;
        }
        
        const data = await getPage(id);
        state.page = data;
        
        switch (state.page.content) {
          case 'places':
            const places = await getPlaces();
            state.content = {
              type: 'places',
              list: places
            };
        }
      } catch (e) {
        console.log(e)
      }
      
    })

    const onChange = (e) => {
      console.log(e)
      state.tabKey = e;
    }
    
    const pageData = computed(() => {
      let componentData = [];
      if (state.page) {
        const { ID, title, author, CreatedAt, readCount, abstract } = state.page;
        componentData.push(
          {
            type: 'title',
            id: ID,
            value: {
              title,
              author,
              CreatedAt,
              readCount,
              abstract
            }
          }
        );
      }
      // 如果在页面中存在筛选元素
      if (state.content.list && "countyName") {
        const tabs = uniKey(state.content.list, 'countyName');
        console.log('tabs', tabs)
        componentData.push(
          {
            type: 'tabs',
            id: 'tabs',
            value: {
              items: tabs
            }
          }
        );
      }
      if (state.content.list && state.content.list.length > 0) {

        const listByFilter = state.tabKey === '全部' ? state.content.list.filter((ele, i) => i < 30) : state.content.list.filter((ele) => { return ele.countyName === state.tabKey})
        const placeData = listByFilter.map(ele => {
        const d = distance(geolocation.latitude, geolocation.longitude, ele.lat, ele.lng);
          return {
            type: 'place',
            id: 'place' + ele.ID,
            value: Object.assign(ele, {distance: d})
          }
        })
        componentData.push(...placeData)
      }
      return componentData;
    })
    return { state, onShowSheet, show, pageData, onChange }
  }
}
</script>

<style lang="less">
.page{
  padding: 24px 16px 16px;
  background: #fff;
}
</style>