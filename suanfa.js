/*
 * @Author: daping
 * @Date: 2021-02-25 14:52:12
 * @LastEditTime: 2021-02-25 16:39:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \undefinedd:\github\suanfa.js
 */

/**
 * @description: 爬楼梯算法，配波拉契数列解
 * 仔细观察一下，n > 2时，
 * 每一次的结果都可以根据前两次的结果得出，因此递推的思想出来了，我们可以用递推求解
 * @param {*} 
 * @return {*}
 */
const climbStairs = function (n) {
    var arr = new Array();
    for (let i = 1; i <= n; i++) {
        if(i < 3) {
            arr[i-1] = i; 
        } else {
            // 大于3的用前2位数相加
            arr[i-1] = arr[i-2] + arr[i-3]
        }
    }

    return n <= 0 ? 0 : arr[n-1]
}

/**
 * @description: 二分排序
 * @param {*} arr
 * @return {*}
 */
const dichotomySort = function (arr) {
    if (arr <= 1) {
        return arr
    }

    var leftArr = [];
    var rightArr = [];
    var randomVal = arr[0];

    for (let i = 1, len = arr.length; i < len; i++) {
        if (arr[i] < randomVal) {
            leftArr.push(arr[i])
        } else {
            rightArr.push(arr[i])
        }
    }

    return [].concat(dichotomySort(leftArr), [randomVal], dichotomySort(rightArr))
}

/**
 * @description: 冒泡排序
 * @param {*} arr
 * @return {*}
 */
const bubbleSort = function (arr) {
    if (arr.length == 1) {
        return arr
    }

    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                var n = arr[i]
                arr[i] = arr[j]
                arr[j] = n;
            }
        }
    }

    return arr
}