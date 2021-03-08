/*
 * @Author: daping
 * @Date: 2021-02-25 14:52:12
 * @LastEditTime: 2021-03-08 22:35:15
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

/**
 * @description: 两数之和
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那两个整数
 * 并返回他们的数组下标。
 * 思路：创建一个键值对对象，key为差值，value为索引，用减法得出
 * @param {*} arr 所需数组
 * @param {*} target 合值
 * @return {*}
 */
const twoSum = function (arr, target) {
    let maps = {};

    for(let i=0; i<arr.length; i++) {
        if(maps[target - arr[i]] !== undefined) {
            return [maps[target - arr[i]], i]
        }

        maps[arr[i]] = i;
    }
}

/**
 * @description: 给定一个只包括 ‘(’，’)’，’{’，’}’，’[’，’]’ 的字符串，判断字符串是否有效。
有效字符串需满足：
左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
 * @param {*} s 是有效括号字符串
 * @return {*} 布尔值
 */
const isValid = function (s) {
    let items = [];
    let len = s.length;

    let lastVal;

    if(len%2 != 0) {
        return false
    }

    for(let i=0; i<len; i++) {
        lastVal = items[items.length - 1];
        
        switch(s[i]){
            case '(':
                items.push('(')
                break
            case '[':
                items.push('[')
                break
            case '{':
                items.push('{')
                break
            case ')':
                if(lastVal == '(') items.pop()
                break
            case ']':
                if(lastVal == '[') items.pop()
                break
            case '}':
                if(lastVal == '{') items.pop()
                break
        }
    }
    return items.length == 0
}