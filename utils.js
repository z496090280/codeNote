/*
 * @Author: daping
 * @Date: 2021-02-25 10:24:30
 * @LastEditTime: 2021-02-25 11:09:09
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

    return function(e) {
        let context = this,
            args = arguments;
        // console.log(e)
        if (immediate && !timer) {
            fn.apply(context, args)
        }
        
        if(timer) clearTimeout(timer);

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

        if(!timer) {
            timer = setTimeout(() => {
                fn.apply(context, args)
                timer = null
            }, delayed)
        }
    }
}