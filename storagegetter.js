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
  let impdata = res.iitcdata
  for (let i in impdata) {
    if (typeof impdata[i] === 'object') impdata[i] = JSON.stringify(impdata[i])
    localStorage.setItem(i, impdata[i])
  }
  setInterval(() => {
    chrome.storage.sync.set({'iitcdata': exp()}, () => {
      console.log('数据同步完成')
    })
  }, 30000)
})
