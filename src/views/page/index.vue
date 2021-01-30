<template>
  <div class="page">
    <div v-for="section in state.pageData" :key="section.id">
      <template v-if="Array.isArray(section.value)">
        <component :is="'w-' + section.type" :latitude="latitude" :longitude="longitude" :data="content" v-for="content in section.value" :key="content.id" v-on:showSheet="sayHi"></component>
      </template>
      <template v-else>
        <component :is="'w-' + section.type" :data="section.value"></component>
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
  // computed,
  // nextTick,
  onMounted,
  reactive,
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
  mounted() {
    console.log('mounted')
    let _this = this;
    // this.$bridge.initSDK(this,function (){
    //   // _this.$toast('initSDK ok')
    //   _this.$bridge.getLocation(function (res) {
    //     _this.latitude = res.latitude;
    //     _this.longitude = res.longitude;
    //     _this.$toast(_this.latitude);
    //   })
    // })
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
      pageData: [],
      actions: []
    })

    // const geolocation = reactive({
    //   longitude: 31.23,
    //   latitude: 121.47
    // })
    let geolocation = {
      longitude: 31.23,
      latitude: 121.47
    }

    const { initSDK, getEnv, getLocation } = useWx();
    // provide('geolocation', geolocation)

    const onShowSheet = (actions) => {
      console.log('page onShowSheet')
      state.actions = actions;
      show.value = true;
    }

    onMounted(async () => {
      try {
        const { id } = route.query;
        if (isWeixin()) {
          await initSDK();
          const env = await getEnv();
          console.log(env)
          const location = await getLocation();
          console.log('location', location)
          geolocation.longitude = location.longitude;
          geolocation.latitude = location.latitude;
        }
        
        const data = await getPage(id);
        state.page = data;
        const { ID, title, author, CreatedAt, readCount, abstract } = state.page;
        state.pageData.push(
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
        switch (state.page.content) {
          case 'places':
            const places = await getPlaces();
            const subPlaces = places.filter((ele, i) => i < 30)
            const placeData = subPlaces.map(ele => {
              const d = distance(geolocation.latitude, geolocation.longitude, ele.lat, ele.lng);
              return {
                type: 'place',
                id: ele.ID,
                value: Object.assign({}, ele, {distance: d})
              }
            })
            console.log(placeData)
            state.pageData = state.pageData.concat(placeData)
            // state.content = {
            //   type: 'places',
            //   list: places
            // };
        }
      } catch (e) {
        console.log(e)
      }
      
    })
    
    return { state, onShowSheet, show }
  }
}
</script>

<style lang="less">
.page{
  padding: 24px 16px 16px;
  background: #fff;
}
</style>