// 这是一个自定义封装js对象 文件,参考地址：https://juejin.cn/post/6844904094079926286

    // 1.自定义封装 Promise
    function Promise (fn) {
        this.cbs = [];

        const resolve = (val) => {
            // 注意promise的then函数需要异步执行
            setTimeout(() => {
                this.data = val;

                this.cbs.forEach((cb) => cb(val));
            })
        }
        // 执行用户传入的函数 
        // 并且把resolve方法交给用户执行
        fn(resolve);
    }
    Promise.prototype.then = function (onResolved) {
         // 这里叫做promise2
        return new Promise((resolve) => {
            this.cbs.push(() => {
                let res = onResolved(this.data);

                if(res instanceof Promise) {
                    // user promise
                    res.then(resolve)
                } else {
                    resolve(res)
                }
            })
        })
    }

    // 1调用实例
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(1)
        }, 500)
    })
        .then((res) => {
            console.log(res);
            // user promise
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(2)
                }, 500)
            })
        })
        .then(console.log);