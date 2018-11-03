let app = new Vue({
  el: '.container',
  data: {
    clouddata: [],
    editModal: {
      index: 0
    }
  },
  methods: {
    cleanalldatasave() {
      if (!confirm(`This operation will just remove all ICST cloud data, your all IITC local storage will be safe.`)) return
      let that = this
      chrome.storage.sync.remove(['iitcdata'], () => {
        that.clouddata = []
      })
    },
    cleanalldata() {
      if (!confirm(`All your ICST and IITC data in this Chrome may all removed.`)) return
      this.clouddata = [],
      this.effect()
    },
    remove(e) {
      if (!confirm(`Remove data “${this.clouddata[e].key}” will effect your IITC next time.`)) return
      this.clouddata.splice(e, 1)
      this.effect()
      // let that = this
    },
    edit(e) {
      this.editModal.index = e
      $('#edit').modal('toggle')
    },
    effect() {
      let res = {}
      for (let i in this.clouddata) res[this.clouddata[i].key] = this.clouddata[i].data
      chrome.storage.sync.set({'iitcdata': res}, res => {})
    }
  },
  created() {
    let that = this
    chrome.storage.sync.get(['iitcdata'], res => {
      let array = []
      for (let i in res.iitcdata) {
        let data = res.iitcdata[i]
        array = array.concat({
          key: i,
          data: data
        })
      }
      that.clouddata = array
    })
  },
  computed: {
    textareacontent: {
      get() {
        if (typeof this.clouddata[this.editModal.index].data === 'object') return JSON.stringify(this.clouddata[this.editModal.index].data)
        else return this.clouddata[this.editModal.index].data
      },
      set(res) {
        try {
          this.clouddata[this.editModal.index].data = JSON.parse(res)
        } catch (e) {
          this.clouddata[this.editModal.index].data = res
        }
        this.effect()
      }
    }
  }
})
