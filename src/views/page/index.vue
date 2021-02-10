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
    <a id="phone" :href="'tel:' + state.phone">{{state.phone}}</a>
    <!-- <a :href="'tel:' + state.actions[0].phone"></a> -->
    <!-- <van-button type="primary">主要按钮</van-button> -->
    <van-action-sheet
      v-model:show="show"
      :actions="state.actions"
      @select="onSelect"
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
      pageNum: 1,
      pageSize: 15,
      pageHeader: [],
      pageContent: [],
      pageFooter: [],
      actions: [],
      phone: ''
    })

    // const geolocation = reactive({
    //   longitude: 31.23,
    //   latitude: 121.47
    // })
    let geolocation = {
      longitude: 121.47,
      latitude: 31.23
    }

    const { 
      initSDK,
      getEnv,
      getLocation,
      setAppMessageShareData,
      setTimelineShareData,
      setMenuShareAppMessage,
      setMenuShareTimeline } = useWx();
    // provide('geolocation', geolocation)

    const onShowSheet = (actions) => {
      state.actions = actions;
      state.phone = actions[0].phone;
      show.value = true;
    }

    const onSelect = (item) => {
      console.log(item)
      document.getElementById("phone").click();
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      show.value = false;
    };

    onMounted(async () => {
      const { id } = route.query;
      try {
        const page = await getPage(id);
        state.page = page.data;
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
        const cates = page.cates;
        const items = cates.map(ele => ele.content)
        // 如果在页面中存在筛选元素
        // if (state.content.list && "countyName") {
          // const tabs = uniKey(state.content.list, 'countyName');
          // console.log(tabs)
        cates.length > 0 &&  state.pageHeader.push(
          {
            type: 'tabs',
            id: 'tabs',
            value: {
              items: ['全部', ...items]
            }
          }
        );
        // }

        // switch (state.page.content) {
        //   case 'places':
        //     const places = await getPlaces();
        //     state.content = {
        //       type: 'places',
        //       list: places
        //     };
        // }

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
          // const setAppMessageShareDataRes = await setAppMessageShareData(params);
          // console.log('setAppMessageShareDataRes', setAppMessageShareDataRes);
          // const setTimelineShareDataRes = await setTimelineShareData(params);
          // console.log('setTimelineShareDataRes', setTimelineShareDataRes);
          const setMenuShareAppMessageRes = await setMenuShareAppMessage(params);
          console.log('setMenuShareAppMessageRes', setMenuShareAppMessageRes);
          const setMenuShareTimelineRes = await setMenuShareTimeline(params);
          console.log('setMenuShareTimelineRes', setMenuShareTimelineRes);
          
          
        }
      } catch (e) {
        console.log(e)
      }
      
    })

    const onChange = (e) => {
      console.log(e)
      state.tabKey = e;
      state.pageNum = 1;
      state.finished = false;
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
    
    const fetchPageData = async () => {
      let componentData = [];
      const places = await getPlaces({
        pageNum: state.pageNum,
        pageSize: state.pageSize,
        type: state.page.contentType,
        fieldName: state.page.categoryField ? state.page.categoryField : '',
        fieldValue: state.tabKey === '全部' ? '' : state.tabKey
      });
      // if (state.content.list && state.content.list.length > 0) {
        // const start = state.pageNum * state.pageSize;
        // const end = state.pageNum * state.pageSize + state.pageSize;
        // const listByFilter = state.tabKey === '全部' ? state.content.list : state.content.list.filter((ele) => { return ele.countyName === state.tabKey});
        // const listByPage = listByFilter.filter((ele, i) => i >= start && i < end);
        if (places.length === 0) {
          state.finished = true;
        }
        const placeData = places.map(ele => {
        const d = distance(geolocation.latitude, geolocation.longitude, ele.lat, ele.lng);
          return {
            type: 'place',
            id: 'place' + ele.ID,
            value: Object.assign(ele, {distance: d})
          }
        })
        componentData.push(...placeData)
      // }
      if (state.pageNum === 1) {
        state.pageContent = componentData;
      } else {
        state.pageContent.push(...componentData);
      }
      state.loading = false;
      state.refreshing = false;
       
    }
    return { state, onShowSheet, show, pageData, onChange, onSelect, onLoad, onRefresh }
  }
}
</script>

<style lang="less">
.page{
  padding: 24px 16px 16px;
  background: #fff;
}
#phone{
  opacity: 0;
}
</style>