// 场景
// 假设我们在开发一款外卖网站，进入网站的时候，第一步需要去请求后端接口得到用户的常用外卖地址。然后再去请求其他接口、渲染页面。如果什么都不考虑可能会直接这样写：

// getAddress 异步请求
// 页面里有三个模块 A，B，C 需要拿到地址后再进行下一步
// A、B、C 三个模块都是不同人写的，提供了不同的方法供我们调用

getAddress().then(res => {
	const address = res.address;
	A.update(address); // 更新地址具体位置，
	B.next(address);  // 渲染商家页面信息
	C.change(address); // 修改订单信息

});

// 此时页面里多了一个模块 D ，同样需要拿到地址后进行下一步操作，我们只好去翻请求地址的代码把 D 模块的调用补上。
// getAddress 异步请求
// 页面里有三个模块 A，B，C 需要拿到地址后再进行下一步
// A、B、C 三个模块都是不同人写的，提供了不同的方法供我们调用

getAddress().then(res => {
	const address = res.address;
	A.update(address);
	B.next(address);
	C.change(address);
	D.init(address); // 活动类型初始化
});

// 优化
// 页面里有三个模块 A，B，C 需要拿到地址后再进行下一步
// A、B、C 三个模块都是不同人写的，提供了不同的方法供我们调用
const observers = [];
// 注册观察者
observers.push(A.update);
observers.push(B.next);
obervers.push(C.change);

// getAddress 异步请求
getAddress().then(res => {
	const address = res.address;
	observers.forEach(update => update(address));
});


// 优点：
// 

// 缺点：
// 需要自己去维护push方法