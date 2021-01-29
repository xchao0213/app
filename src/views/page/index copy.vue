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
import wTabs from '../../components/wTabs.vue';
import wPlace from '../../components/wPlace.vue';
import wFooter from '../../components/wFooter.vue';
import { getPage, getPlaces } from '../../api/app'
export default {
  name: 'page',
  components: {
    [Button.name]: Button,
    wTitle,
    wTabs,
    wPlace,
    wFooter
  },
  data() {
    return {
      id: '',
      page: {},
      content: {},
      contentType: '',
      tabsContent: 'countyName',
      pageData: [
        // {
        //   type: 'title',
        //   id: 'fasfa',
        //   value: {
        //     text: '上海市新冠病毒核酸检测采样机构',
        //     author: '上海市卫生健康委员会 上海市中医药管理局',
        //     createdAt: '',
        //     readCount: 0,
        //     abstract: '上海市公布的最新核酸检测采样机构，摘自上海市卫生健康委员会网站。'
        //   }
        // },
        // {
        //   type: 'place',
        //   id: 'fwefwf',
        //   value: [
        //     {
        //       id: '3243',
        //       name: '东方医院(本部)',
        //       address: '即墨路150号',
        //       province: '',
        //       city: '',
        //       county: '',
        //       tag: '浦东',
        //       wechat: 'https://static.wozaizhao.com/wechat/easthospital.png',
        //       phone: '021-61569338',
        //       phoneRemark: '周一至周五8:00-17:00',
        //       location: {lng: 121.51331, lat: 31.23775}
        //     }
        //   ]
        // },
        // {
        //   type: 'footer'
        // }
      ],
    }
  },
  mounted() {
    const { id } = this.$route.query;
    this.id = id;
    this.init();
    // getPage(id).then(page => {
    //   this.page = page;
    //   const { content } = this.page;
    //   switch (content) {
    //     case 'places':
    //       this.getPlaces();
    //       break;
    //   }
    //   this.pageData.push(
    //     {
    //       type: 'title',
    //       id: this.page.ID,
    //       value: {
    //         text: this.page.title,
    //         author: this.page.author,
    //         createdAt: this.page.CreatedAt,
    //         readCount: this.page.readCount,
    //         abstract: this.page.abstract
    //       }
    //     },
    //   )
    // })
    getPlaces().then(res => {
      console.log(res)
    })
  },
  methods: {
    async init() {
      try {
        const page = await getPage(this.id);
        this.page = page;
        switch (this.page.content) {
          case 'places':
            const places = getPlaces();
            this.content = places;
            this.contentType = 'places';
        }
        this.makePage();
      } catch (e) {
        console.log(e)
      }
    },
    makePage () {
      const { ID, title, author, CreatedAt, readCount, abstract} = this.page;
      this.pageData.push(
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
      console.log(this.content)
      const tabsContent = Object.freeze(this.content)
      const keys = tabsContent.map(ele => ele[this.tabsContent]);
      const tabsItems = Array.from(new Set(keys));
      console.log(tabsItems)
      this.pageData.push({
        type: 'tabs',
        id: 'tabs',
        value: {
          items: tabsItems
        }
      })
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