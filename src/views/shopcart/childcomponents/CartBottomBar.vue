<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <check-button
        class="checked-all"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="totalPrice">合计: {{ totalPrice }}</div>
    <div class="calculate">去结算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
import { mapGetters } from 'vuex'

export default {
  
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '$' + this.cartList.filter((item) => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter((item) => {
        return item.checked
      }).length
    },
    isSelectAll() {
      if(this.cartList.length === 0) return false
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkAllClick() {
      this.$store.commit()
    },
    checkClick() {
      if(this.isSelectAll) {
        this.$store.commit('checkFalse')
      }else {
        this.$store.commit('checkTrue')
      }
    }
  }
}
</script>

<style scoped>
.cart-bottom-bar {
  background-color: #eeeeee;
  display: flex;
  height: 49px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 49px;
  line-height: 49px;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 5px;
  width: 60px;
}

.checked-all {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.totalPrice {
  margin-left: 20px;
  flex: 1;
}

.calculate {
  width: 117px;
  background-color: #fb7299;
  text-align: center;
  color: #ffffff;
}
</style>