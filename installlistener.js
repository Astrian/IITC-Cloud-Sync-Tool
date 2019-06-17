chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['interval', 'preference'], res => {
    if (res.interval) {
      chrome.storage.sync.set({'preference': { interval: res.interval, theme: 'prime-purple' }}, res => {})
      chrome.storage.sync.remove(['interval'], res => {})
    } else if (res.preference) {
      console.log('well, your settings is perfet.')
    } else {
      alert('Thanks for installing ICST! Notice that use this plugin needs you turn sync function available on your Chrome. Continue to operate means you agree the Privacy Policy of Google Chrome. You can remove all data from ICST anytime.')
      chrome.storage.sync.set({'preference': { interval: 300000, theme: 'prime-purple' }}, res => {})
    }
  })
})
