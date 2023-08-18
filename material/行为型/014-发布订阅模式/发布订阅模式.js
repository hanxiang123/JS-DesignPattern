// 场景
// 假设我们在开发一款外卖网站，进入网站的时候，第一步需要去请求后端接口得到用户的常用外卖地址。然后再去请求其他接口、渲染页面。使用了观察者模式会这样写：

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

// 优化

// 地址模块
import { EventBus } from './event.js';

// getAddress 异步请求
getAddress().then(res => {
	const address = res.address;
	EventBus.emit('ADDRESS', address);
});

// A模块
import { EventBus } from './event.js';

const update = address => {
	// 自己的逻辑
};

EventBus.on('ADDRESS', address => update(address));

// B模块
import { EventBus } from './event.js';

const next = address => {
	// 自己的逻辑
};

EventBus.on('ADDRESS', address => next(address));

// C模块
import { EventBus } from './event.js';

const change = address => {
	// 自己的逻辑
};

EventBus.on('ADDRESS', address => change(address));


// 基于观察者模式的优化