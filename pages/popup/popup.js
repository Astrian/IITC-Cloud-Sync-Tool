let app = new Vue({
  el: '#app',
  data: {
    interval: 0
  },
  methods: {
    goToIntel() {
      chrome.tabs.create({ url: 'https://intel.ingress.com/intel' }, () => {})
    },
    justifyInterval(time) {
      let that = this
      chrome.storage.sync.set({ interval: time }, res => {
        that.interval = time
      })
    },
    goToSettings() {
      console.log('aaa')
    }
  },
  created() {
    let that = this
    chrome.storage.sync.get(['interval'], res => {
      that.interval = res.interval
    })
  }
})
