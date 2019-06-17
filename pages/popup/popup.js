let app = new Vue({
  el: '#app',
  data: {
    preference: {},
    extensionid: ''
  },
  methods: {
    goToIntel() {
      chrome.tabs.create({ url: 'https://intel.ingress.com/intel' }, () => {})
    },
    justifyInterval(time) {
      this.preference.interval = time
      this.togglepref()
    },
    justifyTheme(theme) {
      this.preference.theme = theme
      this.togglepref()
    },
    togglepref() {
      console.log(this.preference)
      chrome.storage.sync.set({ preference: this.preference }, res => {})
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
    chrome.storage.sync.get(['preference'], res => {
      console.log(res.preference)
      that.preference = res.preference
    })
  }
})
