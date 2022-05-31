/*
 * @Author: lee
 * @Date: 2022-05-30 21:45:15
 * @LastEditTime: 2022-05-30 21:53:25
 */
// 发布订阅模式

// 发布者
class Dep {
  constructor(name) {
    this.name = name;
    this.dependencies = [];
  }

  addDependency(dep) {
    this.dependencies.push(dep);
  }

  getDependencies() {
    return this.dependencies;
  }

  notify() {
    this.dependencies.forEach(dep => dep.callPhone())
  }
}

class Watch {
  constructor(cb) {
    this.cb = cb;
  }

  callPhone() {
    this.cb()
  }
}

// 实例化发布者
const dep = new Dep('dep');

// 实例化订阅者
console.log(`watch出门咯`)
const watch = new Watch(() => {
  console.log('watch go home')
});

console.log(`watch2出门咯`)
const watch2 = new Watch(() => {
  console.log('watch2 go home')
});

dep.addDependency(watch);
dep.addDependency(watch2);

setTimeout(() => {
  // 一天后
  console.log(`一天后`)
  dep.notify();
}, 1000);