let app = new Vue({
  el: '#app',
  data: {
    interval: 0,
    extensionid: ''
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
      chrome.tabs.create({ url: `chrome-extension://${this.extensionid}/pages/datamanage/datamanage.html` }, () => {})
    },
    goToAbout() {
      chrome.tabs.create({ url: `chrome-extension://${this.extensionid}/pages/about/about.html` }, () => {})
    }
  },
  created() {
    this.extensionid = chrome.runtime.id
    let that = this
    chrome.storage.sync.get(['interval'], res => {
      that.interval = res.interval
    })
  }
})
