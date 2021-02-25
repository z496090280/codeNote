// 这是一个自定义封装js对象 文件

    // 1.自定义封装 Promise,参考地址：https://juejin.cn/post/6844904094079926286
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

    // 2.自定义封装async await,参考地址：https://juejin.cn/post/6844904102053281806
    function asyncToGenerator (generatorFunc) {
        return function() {
            const gen = generatorFunc.apply(this, arguments);
            return new Promise((resolve, reject) => {
                function step (key, arg) {
                    let generatorResult;

                    try {
                        generatorResult = gen[key](arg);
                    } catch (error) {
                        reject(error);
                    }
                    const { value, done } = generatorResult;
                    if(done) {
                        return resolve(value);
                    } else {
                        return Promise.resolve(value).then(res => step('next', res), err => step('throw', err));
                    }
                    
                }
                step('next')
            })
        }
    }
    // 2调用实例
        /**
         * async的执行原理
         * 其实就是自动执行generator函数
         * 暂时不考虑genertor的编译步骤（更复杂）
         */
    function* testG () {
        const data = yield getData();
        console.log('data: ', data);
        const data2 = yield getData();
        console.log('data2: ', data2 + '2');
        return 'success'
    }
    const getData = () => {
       return new Promise((resolve) => {
            setTimeout(() => {
                resolve('data')
            }, 1000)
        })
    }
    const testGAsync = asyncToGenerator(testG)
    testGAsync().then((resule) => console.log(resule))