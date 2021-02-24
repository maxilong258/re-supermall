<template>
  <div class="home-recommend">
    <div
      v-for="(item, index) in recommends"
      :key="index"
      class="home-recommend-item"
    >
      <a :href="item.link">
        <img :src="item.image" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  props: {
    recommends: {
      type: Array,
      dafault() {
        return[]
      }
    }
  }
}
</script>

<style scoped>
.home-recommend {
  display: flex;
  width: 100%;
  text-align: center;
  padding: 10px 0 25px;
  border-bottom: 10px solid #eee;
}

.home-recommend-item {
  flex: 1;
}

.home-recommend-item img {
  border-radius: 100%;
  max-width: 70%;
  max-height: 72%;
  object-fit: cover;
}
</style>