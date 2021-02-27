<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav-bar"
      ><div slot="center">详情页</div></detail-nav-bar
    >
    <div class="detail-content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :base-info="baseInfo"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <loading></loading>
    </div>
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

import Loading from 'components/common/loading/Loading'

import { getDetail, GoodsInfo, Shop, GoodsParam } from 'network/detail'


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
    Loading,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      baseInfo: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {}
    }
  },
  created() {
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res => {
      console.log(res);
      this.topImages = res.result.itemInfo.topImages
      this.baseInfo = new GoodsInfo(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)
      this.shop = new Shop(res.result.shopInfo)
      this.detailInfo = res.result.detailInfo;
      this.paramInfo = new GoodsParam(res.result.itemParams.info, res.result.itemParams.rule)
      if(res.result.rate.cRate !== 0) this.commentInfo = res.result.rate.list[0]
    })
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
  z-index: 9999;
  background-color: #fff;
}

.detail-content {
  margin-top: 44px;
}
</style>