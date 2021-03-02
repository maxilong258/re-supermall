<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <div class="content" ref="content">
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <home-feature-view class="home-feature-view"></home-feature-view>
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @itemClick="tabClick"
      ></tab-control>
      <goods-list :goods="showGoods" class="goods-list"></goods-list>
      <loading></loading>
    </div>
    <back-top
      class="home-back-top"
      @click.native="backTopClick"
      v-if="showBackTop"
    ></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childcomponents/HomeSwiper'
import HomeRecommend from './childcomponents/HomeRecommend'
import HomeFeatureView from './childcomponents/HomeFeatureView'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goodslist/GoodsList'
import Loading from 'components/common/loading/Loading'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import { backTopMixin } from 'common/mixin'


export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeatureView,
    TabControl,
    GoodsList,
    Loading
  },
  mixins: [ backTopMixin ],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      scroll: 0
    }
  },

  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },

  created() {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },

  mounted() {
     
     //监听滚动 切换页面定位回原来的位置
     window.addEventListener('scroll', this.handleScroll);
     //监听滚动 触底时候调用上拉加载更多
     window.addEventListener('scroll', () => {
       //1440好像不能写死，太小在高分辨率设备上无法刷新，太大可能会在低分辨率设备上会疯狂刷新 具体咋写我不会
      if( document.documentElement.scrollTop >= this.$refs.content.offsetHeight - 1440 ){
        this.pullUpLoad()
      }
    })
  },

  activated() { 
    if(this.scroll > 0) {
      window.scrollTo(0, this.scroll);
      this.scroll = 0;
      window.addEventListener('scroll', this.handleScroll);
    }
  },
  deactivated() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    
    handleScroll () {
      this.scroll  = document.documentElement && document.documentElement.scrollTop
    },   

    //事件监听相关方法
    //上拉加载更多 
    pullUpLoad() {
      this.getHomeGoods(this.currentType)
      this.pullUpLoad = () => {}
    },
    finishPullUpLoad() {
      this.pullUpLoad = () => {
        this.getHomeGoods(this.currentType)
        this.pullUpLoad = () => {}
      }
    },

    tabClick(index) {
      switch(index) {
        case 0: 
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },

    //网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      }) 
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        //完成上拉加载更多
        this.finishPullUpLoad()
      })
    }
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
  padding-bottom: 44px;
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}

.content {
  position: absolute;
  margin-bottom: 44px;
}

.home-back-top {
  z-index: 9;
}
</style>