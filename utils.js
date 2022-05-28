/*
 * @Author: daping
 * @Date: 2021-02-25 10:24:30
 * @LastEditTime: 2022-05-28 18:44:00
 * @LastEditors: Please set LastEditors
 * @Description: 函数工具类
 * @FilePath: \undefinedd:\github\utils.js
 */

/**
 * @description: 防抖,将多次高频操作优化为只在最后一次执行
 *               通常使用的场景是：用户输入，只需再输入完成后做一次输入校验即可。
 * @param {*} fn
 * @param {*} delayed 
 * @param {*} immediate 
 * @return {*}
 */
const debounce = function (fn, delayed, immediate) {
  let timer = null;

  return function (e) {
    let context = this,
      args = arguments;
    // console.log(e)
    if (immediate && !timer) {
      fn.apply(context, args)
    }

    if (timer) clearTimeout(timer);

    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delayed)
  }
}

/**
 * @description: 节流,每隔一段时间后执行一次，也就是降低频率
 *               通常使用场景: 滚动条事件 或者 resize 事件，通常每隔 100~500 ms执行一次即可
 * @param {*} fn
 * @param {*} delayed
 * @param {*} immediate
 * @return {*}
 */
const throttle = function (fn, delayed, immediate) {
  let timer = null;
  let callNow = immediate;

  return function (e) {
    let context = this,
      args = arguments;
    if (callNow) {
      fn.apply(context, args)
      callNow = false
    }

    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args)
        timer = null
      }, delayed)
    }
  }
}

/**
 * @description: 页面多请求优化最大并发数
 * @param {*} urls
 * @param {*} maxNum 最大并发数
 * @return {*}
 */
function multiRequest(urls, maxNum = 5) {
  let count = 0
  let len = urls.length
  let result = new Array(len).fill(false)
  return new Promise((resolve, reject) => {
    while (count < maxNum) {
      task()
    }
    function task() {
      let idx = count++
      let url = urls[idx]
      console.log(result)
      if (idx >= len) {
        !result.includes(false) && resolve(result)
        return
      }
      console.log(`第${idx}个请求开始`)
      fetch(url).then(res => res.json()).then(res => {
        console.log(`第${idx}个请求结束`)
        result[idx] = res
        if (idx < len) task()
      }).catch(err => {
        result[idx] = err
        if (idx < len) task()
      })
    }
  })
}

let urlArr = new Array(10).fill('https://tenapi.cn/bilibili/?uid=1')
multiRequest(urlArr, 5).then(res => {
  console.log(res)
})

/**
 * @description: 深拷贝
 * @param {*} obj 拷贝对象
 * @return {*} 返回对象
 */
function deepClone(obj) {
  let result
  if (typeof obj === 'object') {
    result = Array.isArray(obj) ? [] : {}
    for (let key in obj) {
      result[key] = deepClone(obj[key])
    }
  } else {
    result = obj
  }
  return result
}

let objDeepClone = {
  a: 1,
  b: {
    name: 'daping',
    age: 18
  }
}

let objDeepClone2 = deepClone(objDeepClone)
objDeepClone2.b.name = 'daping2'
console.log(objDeepClone)