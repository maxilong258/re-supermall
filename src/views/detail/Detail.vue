<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"
      ><div slot="center">详情页</div></detail-nav-bar
    >
    <div class="detail-content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :base-info="baseInfo"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @loadimg="imgLoaded"
      ></detail-goods-info>
      <detail-param-info
        :param-info="paramInfo"
        class="detail-param-info"
      ></detail-param-info>
      <detail-comment-info
        :comment-info="commentInfo"
        class="detail-comment-info"
      ></detail-comment-info>
      <goods-list
        :goods="recommends"
        class="detail-recommend-info"
      ></goods-list>
    </div>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTopClick" v-if="showBackTop"></back-top>
    <toast :message="message" :show="show"></toast>
  </div>
</template>

<script>
import DetailNavBar from './childcomponents/DetailNavBar'
import DetailSwiper from './childcomponents/DetailSwiper'
import DetailBaseInfo from './childcomponents/DetailBaseInfo'
import DetailShopInfo from './childcomponents/DetailShopInfo'
import DetailGoodsInfo from './childcomponents/DetailGoodsInfo'
import DetailParamInfo from './childcomponents/DetailParamInfo'
import DetailCommentInfo from './childcomponents/DetailCommentInfo'
import GoodsList from 'components/content/goodslist/GoodsList'
import DetailBottomBar from './childcomponents/DetailBottomBar'
import Toast from 'components/common/toast/Toast'

import { getDetail, getRecommend, GoodsInfo, Shop, GoodsParam } from 'network/detail'
import { backTopMixin } from 'common/mixin'
import { mapActions } from 'vuex'




export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Toast
  },
  mixins: [ backTopMixin ],
  data() {
    return {
      iid: null,
      topImages: [],
      baseInfo: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      topYs: [],
      currentIndex: 0,
      message: 'hhhhhh',
      show: false
    }
  },
  created() {
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res => {
      this.topImages = res.result.itemInfo.topImages
      this.baseInfo = new GoodsInfo(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)
      this.shop = new Shop(res.result.shopInfo)
      this.detailInfo = res.result.detailInfo;
      this.paramInfo = new GoodsParam(res.result.itemParams.info, res.result.itemParams.rule)
      if(res.result.rate.cRate !== 0) this.commentInfo = res.result.rate.list[0]
    })
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  
  updated() {
    window.addEventListener('scroll', () => {
      const scrollY = document.documentElement.scrollTop
      let length = this.topYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          scrollY > this.topYs[i] &&
          scrollY < this.topYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
     
    })   
  },
  
  methods: {
    ...mapActions(['saveToCart']),
    titleClick(index) {
      switch(index) {
        case 0:
          window.scrollTo(0, this.topYs[0])
          break
        case 1:
          window.scrollTo(0, this.topYs[1])
          break
        case 2:
          window.scrollTo(0, this.topYs[2])
          break
        case 3:
          window.scrollTo(0, this.topYs[3])
          break
      } 
    },
    imgLoaded() {
      this.topYs = []
      this.topYs.push(0)
      this.topYs.push(document.querySelector('.detail-param-info').offsetTop)
      this.topYs.push(document.querySelector('.detail-comment-info').offsetTop)
      this.topYs.push(document.querySelector('.detail-recommend-info').offsetTop)
      this.topYs.push(Number.MAX_VALUE);
    },
    addToCart() {
      const product = {}
      product.image = this.topImages[0]
      product.title = this.baseInfo.title
      product.desc = this.baseInfo.desc
      product.price = this.baseInfo.realPrice
      product.iid = this.iid
      this.saveToCart(product).then(res => {
        // this.show = true
        // this.message = res
        // setTimeout(() => {
        //   this.show = false
        //   this.message = ''
        // }, 1500)
        this.$toast.show(res, 1500)
        //console.log(this.$toast);
      })
    }
  }
}
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 999;
  background-color: #fff;
}

.detail-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99999;
  background-color: #fff;
}

.detail-content {
  margin-top: 44px;
}
</style>