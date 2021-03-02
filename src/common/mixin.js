import BackTop from '../components/content/backtop/BackTop'

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      showBackTop: false
    }
  },
  created() {
    this.BackTopView()
  },
  methods: {
    backTopClick() {
      window.scrollTo(0, 0)
    },
    BackTopView() {
      window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 939) {
          this.showBackTop = true
        } else {
          this.showBackTop = false
        }
      })
    },
  }

}