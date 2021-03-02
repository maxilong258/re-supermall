<template>
  <div class="shop-cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <shop-cart-list></shop-cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import ShopCartList from './childcomponents/ShopCartList'
import CartBottomBar from './childcomponents/CartBottomBar'
import { mapGetters } from 'vuex'


export default {
  name: 'Shopcart',
  components: {
    NavBar,
    ShopCartList,
    CartBottomBar
  },
  computed: {
     ...mapGetters(['cartLength'])
  }
}


</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
</style>