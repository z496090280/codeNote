/*
 * @Author: your name
 * @Date: 2021-02-25 14:52:12
 * @LastEditTime: 2021-02-25 15:04:22
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