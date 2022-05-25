/*
 * @Author: daping
 * @Date: 2021-02-25 14:52:12
 * @LastEditTime: 2022-05-25 21:11:40
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
    if (i < 3) {
      arr[i - 1] = i;
    } else {
      // 大于3的用前2位数相加
      arr[i - 1] = arr[i - 2] + arr[i - 3]
    }
  }

  return n <= 0 ? 0 : arr[n - 1]
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

  for (let i = 0; i < arr.length; i++) {
    if (maps[target - arr[i]] !== undefined) {
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

  if (len % 2 != 0) {
    return false
  }

  for (let i = 0; i < len; i++) {
    lastVal = items[items.length - 1];

    switch (s[i]) {
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
        if (lastVal == '(') items.pop()
        break
      case ']':
        if (lastVal == '[') items.pop()
        break
      case '}':
        if (lastVal == '{') items.pop()
        break
    }
  }
  return items.length == 0
}

/**
 * @description: 小孩报数问题
 * 有30个小孩儿，编号从1-30，围成一圈依此报数，1、2、3 数到 3 的小孩儿退出这个圈， 
 * 然后下一个小孩 重新报数 1、2、3，问最后剩下的那个小孩儿的编号是多少?
 * @param {*} n 总数
 * @param {*} count 第多少个出列
 * @return {*}
 */
const childNum = function (n, count) {
  let num = n; // 总人数
  const countNum = count; //计数方式

  let arrChild = [];

  for (let i = 0; i < num; i++) arrChild[i] = i + 1

  let exitCount = 0; // 离开总人数
  let counter = 0; // 目前是第几个
  let currentIdx = 0; // 当前下标

  while (exitCount < num - 1) {
    if (arrChild[currentIdx] != 0) counter++

    if (counter == countNum) {
      console.log(arrChild[currentIdx] + '出列')
      arrChild[currentIdx] = 0;
      exitCount++
      counter = 0
    }

    currentIdx++
    if (currentIdx == num) currentIdx = 0;
  }

  for (let j = 0; j < num; j++) {
    if (arrChild[j] != 0) {
      return arrChild[j]
    }
  }
}

/**
 * @description: 数组转tree
 * @param {*} data 所需array
 * @param {*} rootPid 根id
 * @return {*}
 */
const arrToTree = (data, rootPid) => {
  let itemMaps = {}, result = []

  for (const item of data) {
    let id = item.id;
    let pid = item.pid;

    if (!itemMaps[id]) {
      itemMaps[id] = {
        ...item,
        children: []
      }
    }

    const itemTree = itemMaps[id]

    if (pid == rootPid) {
      result.push(itemTree)
    } else {
      if (itemMaps[pid]) {
        itemMaps[pid].children.push(itemTree)
      }
    }
  }

  return result
}
let arrToTreeData = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 },
]
arrToTree(arrToTreeData, 0)