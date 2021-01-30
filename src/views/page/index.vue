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
import {
  ref,
  provide,
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
  data() {
    return {
      latitude: 12.212,
      longitude: 313.222
    }
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

    const geolocation = reactive({
      longitude: 90,
      latitude: 135
    })

    const { initSDK, getLocation } = useWx();
    provide('geolocation', geolocation)

    const onShowSheet = (actions) => {
      console.log('page onShowSheet')
      state.actions = actions;
      show.value = true;
    }

    onMounted(async () => {
      console.log('onMounted')
      const { id } = route.query;
      const location = await getLocation();
      geolocation.longitude = location.longitude;
      geolocation.latitude = location.latitude;
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
          const subPlaces = places.filter((ele, i) => i < 10)
          const placeData = subPlaces.map(ele => {
            return {
              type: 'place',
              id: ele.ID,
              value: ele
            }
          })
          console.log(placeData)
          state.pageData = state.pageData.concat(placeData)
          // state.content = {
          //   type: 'places',
          //   list: places
          // };
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