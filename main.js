
// 获取本地数据
function getLocalStorage() {
  return JSON.parse(localStorage.getItem('website'))
}

// 初始化键盘
function init() {
  var keys = {
    0: { 0: 'q', 1: 'w', 2: 'e', 3: 'r', 4: 't', 5: 'y', 6: 'u', 7: 'i', 8: 'o', 9: 'p', length: 10 },
    1: { 0: 'a', 1: 's', 2: 'd', 3: 'f', 4: 'g', 5: 'h', 6: 'j', 7: 'k', 8: 'l', length: 9 },
    2: { 0: 'z', 1: 'x', 2: 'c', 3: 'v', 4: 'b', 5: 'n', 6: 'm', length: 7 },
    length: 3
  }
  var hash = {
    q: 'qq.com',
    w: 'weibo.com',
    e: 'ele.me',
    r: 'renren.com',
    u: 'uc.com',
    i: 'iqiyi.com',
    p: undefined,
    a: 'acfun.tv',
    s: 'sohu.com',
    z: 'zhihu.com',
    b: 'cn.bing.com',
    m: 'www.mcdonalds.com.cn'
  }
  var localData = getLocalStorage()
  if (localData) {
    hash = localData
  }
  return {
    keys: keys,
    hash: hash
  }
}

var keyboard = init()
kbdKeys = keyboard.keys
kbdHash = keyboard.hash

// 生成键盘
// 行
function createRow() {
  var rows = document.createElement('div')
  rows.className = 'row'
  var main = document.getElementById('main')
  main.appendChild(rows)
  return rows
}
// 键
function createKey() {
  var divKey = document.createElement('div')
  divKey.className = 'key'
  return divKey
}
// 文字
function createText(key) {
  var text = document.createElement('span')
  text.className = 'text'
  text.textContent = key.toUpperCase()
  return text
}
// icon
function createIcon(kbdHash, key) {
  var icon = document.createElement('img')
  icon.className = 'icon'
  var domain = kbdHash[key]
  if (domain) {
    icon.src = 'http://' + domain + '/favicon.ico'
  } else {
    icon.src = './img/icon.webp'
  }
  icon.onerror = function (ev) {
    ev.target.src = './img/icon.webp'
  }
  return icon
}
// button
function createButton(kbdHash, key) {
  var button = document.createElement('button')
  button.id = key.toLowerCase()
  button.textContent = '编辑'
  button.onclick = function () {
    var newDomain = prompt('自定义网址')
    var id = button.id
    if (newDomain) {
      kbdHash[id] = newDomain
      button.previousSibling.src = 'http://' + newDomain + '/favicon.ico'
      button.previousSibling.onerror = function (ev) {
        ev.target.src = './img/icon.webp'
      }
      localStorage.setItem('website', JSON.stringify(kbdHash))
    }
  }
  return button
}

function generateKbd(kbdKeys, kbdHash) {
  for (let index = 0; index < kbdKeys.length; index++) {
    const row = kbdKeys[index]
    var rows = createRow()

    for (let index2 = 0; index2 < row.length; index2++) {
      const key = row[index2]
      var divKey = createKey()
      var text = createText(key)
      var icon = createIcon(kbdHash, key)
      var button = createButton(kbdHash, key)

      rows.appendChild(divKey)
      divKey.appendChild(text)
      divKey.appendChild(icon)
      divKey.appendChild(button)
    }
  }
}

// 监听键盘事件
function listenKbd(kbdHash) {
  document.onkeypress = function (ev) {
    var key = ev.key
    var letterKey = /[a-z]/.test(key)
    if (letterKey) {
      var website = kbdHash[key]
      window.open('http://' + website, '_blank')
    }
  }
}

listenKbd(kbdHash)
generateKbd(kbdKeys, kbdHash)