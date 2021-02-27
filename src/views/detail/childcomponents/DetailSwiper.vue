<template>
  <div class="detail-swiper">
    <swiper class="ds">
      <swiper-item v-for="(item, index) in topImages" :key="index">
        <img :src="item" />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
  name: 'DetailSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.ds {
  height: 53vh;
  overflow: hidden;
}
</style>