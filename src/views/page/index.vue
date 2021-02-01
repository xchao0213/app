<template>
  <div class="page">
    <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh">

      <van-list
        v-model:loading="state.loading"
        :finished="state.finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
      >
        <div v-for="section in pageData" :key="section.id">
          <component :is="'w-' + section.type" :data="section.value" @change="onChange" v-on:showSheet="onShowSheet"></component>
        </div>
      </van-list>
    </van-pull-refresh>

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
    wFooter
  },
  setup(props, { emit, slots }) {
    const route = useRoute()
    const show = ref(false);
    const state = reactive({
      page: {},
      content: {},
      tabKey: '全部',
      loading: false,
      finished: false,
      refreshing: false,
      pageNum: 0,
      pageSize: 15,
      pageHeader: [],
      pageContent: [],
      pageFooter: [],
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

    const { initSDK, getEnv, getLocation, setAppShareData, setTimelineShareData } = useWx();
    // provide('geolocation', geolocation)

    const onShowSheet = (actions) => {
      state.actions = actions;
      show.value = true;
    }

    onMounted(async () => {
      const { id } = route.query;
      try {
        const data = await getPage(id);
        state.page = data;
        if (state.page) {
          const { ID, title, author, CreatedAt, readCount, abstract } = state.page;
          state.pageHeader.push(
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
          )
        }

          
        switch (state.page.content) {
          case 'places':
            const places = await getPlaces();
            state.content = {
              type: 'places',
              list: places
            };
            // 如果在页面中存在筛选元素
            if (state.content.list && "countyName") {
              const tabs = uniKey(state.content.list, 'countyName');
              console.log(tabs)
              state.pageHeader.push(
                {
                  type: 'tabs',
                  id: 'tabs',
                  value: {
                    items: tabs
                  }
                }
              );
            }
        }

        fetchPageData();
      
        if (isWeixin()) {
          await initSDK();
          const env = await getEnv();
          const location = await getLocation();
          geolocation.longitude = location.longitude;
          geolocation.latitude = location.latitude;
          const params = {
            title: `我在找-${state.page.title}`,
            desc: state.page.abstract,
            link: window.location.href,
            imgUrl: 'https://static.wozaizhao.com/logo.png'
          }
          await setAppShareData(params);
          await setTimelineShareData(params);
        }
      } catch (e) {
        console.log(e)
      }
      
    })

    const onChange = (e) => {
      console.log(e)
      state.tabKey = e;
      state.pageNum = 0;
      state.pageContent = [];
      fetchPageData();
    }

    const onLoad = () => {
      state.loading = true;
      state.pageNum = state.pageNum + 1;
      fetchPageData();
    }

    const onRefresh = () => {
      // 清空列表数据
      state.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true;
      state.pageNum = 0;
      state.pageContent = [];
      fetchPageData();
    };
    const pageData = computed(() => {
      let page = [];
      state.pageHeader.length > 0 && page.push(...state.pageHeader);
      state.pageContent.length > 0 && page.push(...state.pageContent);
      state.pageFooter.length > 0 && page.push(...state.pageFooter);
      return page;
    })
    
    const fetchPageData = () => {
      let componentData = [];
      
      if (state.content.list && state.content.list.length > 0) {
        const start = state.pageNum * state.pageSize;
        const end = state.pageNum * state.pageSize + state.pageSize;
        const listByFilter = state.tabKey === '全部' ? state.content.list : state.content.list.filter((ele) => { return ele.countyName === state.tabKey});
        const listByPage = listByFilter.filter((ele, i) => i >= start && i < end);
        if (listByPage.length === 0) {
          state.finished = true;
        }
        const placeData = listByPage.map(ele => {
        const d = distance(geolocation.latitude, geolocation.longitude, ele.lat, ele.lng);
          return {
            type: 'place',
            id: 'place' + ele.ID,
            value: Object.assign(ele, {distance: d})
          }
        })
        componentData.push(...placeData)
      }
      if (state.pageNum === 0) {
        state.pageContent = componentData;
      } else {
        state.pageContent.push(...componentData);
      }
      state.loading = false;
      state.refreshing = false;
       
    }
    return { state, onShowSheet, show, pageData, onChange, onLoad, onRefresh }
  }
}
</script>

<style lang="less">
.page{
  padding: 24px 16px 16px;
  background: #fff;
}
</style>