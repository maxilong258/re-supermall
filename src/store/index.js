import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCount(state, payload) {
      payload.count++
    },
    addToCart(state, payload) {
      state.cartList.push(payload)
    },
    checkFalse(state) {
      state.cartList.forEach((item) => (item.checked = false))
    },
    checkTrue(state) {
      state.cartList.forEach((item) => (item.checked = true))
    }
  },
  actions: {
    saveToCart(context, payload) {
      return new Promise((resolve, reject) => {
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        if (oldProduct) {
          context.commit('addCount', oldProduct)
          resolve('商品数量加1')
        } else {
          payload.count = 1
          payload.checked = true
          context.commit('addToCart', payload)
          resolve('添加购物车成功')
        }
      })
    }
  },
  getters: {
    cartLength(state) {
      return state.cartList.length
    },
    cartList(state) {
      return state.cartList
    }
  }
})

export default store