<template>
  <div class="shop-cart-list">
    <shop-cart-list-item
      v-for="(item, index) in cartList"
      :key="index"
      :itemInfo="item"
    ></shop-cart-list-item>
  </div>
</template>

<script>
import ShopCartListItem from './ShopCartListItem'
import { mapGetters } from 'vuex'
export default {
  name: 'ShopCartList',
  components: {
    ShopCartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  } 
}

</script>

<style scoped>
.shop-cart-list {
  margin: 44px auto 49px;
}
</style>