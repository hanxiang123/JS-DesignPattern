// 场景
// 微信小程序定义一个页面是通过微信提供的 Page 方法，然后传入一个配置对象进去。

Page({
	data: {
		// 参与页面渲染的数据
		logs: [],
	},
	onLoad: function () {
		// 页面渲染后 执行
	},
});

// 如果我们有个需求是在每个页面加载的时候上报一些自定义数据，如何处理？

// 优化
const Base = (option) => {
  const { onLoad, ...rest } = option;
  return {
    ...rest,
    // 重写 onLoad 方法
    onLoad(...args) { 
      // 增加路由字段
      this.reportData(); // 上报数据

      // onLoad
      if (typeof onLoad === 'function') {
        onLoad.call(this, ...args);
      }
    }
    reportData() {
      // 做一些事情
    }
  }
}

Page(Base({
  data: { // 参与页面渲染的数据
    logs: []
  },
  onLoad: function () {
    // 页面渲染后 执行
  }
})

// 在大团队的话，每个业务方可能都需要在小程序生命周期做一些事情，此时只需要利用装饰器模式，编写一个装饰函数，然后在业务代码中调用即可。
// 最终的业务代码可能会装饰很多层，最终才传给小程序 Page 函数。


Page(Base(Log(Ce({
  data: { // 参与页面渲染的数据
    logs: []
  },
  onLoad: function () {
    // 页面渲染后 执行
  }
})

// 与代理模式的区别
// 1.代理模式：直接将对象封装到到代理对象，业务方不关心原始对象，直接使用代理对象
// 2.装饰器模式：提供了装饰器函数，输入原始对象，输出增强处理后的对象，并且还可以继续传给别的装饰器对象，
//  业务方可以任意组合装饰器函数，但是必须的有一个初始化的原始对象
