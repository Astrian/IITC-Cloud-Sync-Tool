chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['interval'], res => {
    if (res.interval) return
    alert('Thanks for installing ICST! Notice that use this plugin needs you turn sync function available on your Chrome. Continue to operate means you agree the Privacy Policy of Google Chrome. You can remove all data from ICST anytime.')
    chrome.storage.sync.set({'interval': 300000}, res => {})
  })
})
