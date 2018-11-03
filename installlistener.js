chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['interval'], res => {
    if (res.interval) return
    alert('Thanks for installing ICST!')
    chrome.storage.sync.set({'interval': 300000}, res => {})
  })
})
