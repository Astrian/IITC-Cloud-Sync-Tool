function exp() { // 导出数据
  let getKey, i = 0, res = {}
  do {
    getKey = localStorage.key(i++)
    let keyres = localStorage.getItem(getKey)
    if (getKey) {
      try {
        res[getKey] = JSON.parse(keyres)
      } catch (e) {
        res[getKey] = keyres
      }
    }
  } while (getKey)
  return res
}

chrome.storage.sync.get(['iitcdata', 'interval'], res => {
  console.log(res)
  if (res.iitcdata){
    localStorage.clear()
  }
  let impdata = res.iitcdata
  for (let i in impdata) {
    if (typeof impdata[i] === 'object') impdata[i] = JSON.stringify(impdata[i])
    localStorage.setItem(i, impdata[i])
  }
  console.log(exp())
  chrome.storage.sync.set({'iitcdata': exp()}, () => {})
  setInterval(() => {
    chrome.storage.sync.set({'iitcdata': exp()}, () => {})
  }, res.interval)
})
