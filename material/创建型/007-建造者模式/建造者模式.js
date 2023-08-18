// 场景
// 如果我们定义了某个函数：
function getPhone(size, type, screen, price = 100) {
	// ...
}

// 如果这个函数很稳定那没什么问题，但如果经常变动，比如新增参数。
function getPhone(size, type, screen, price = 100, discount) {
	// ...
}

function getPhone(size, type, screen, price = 100, discount) {
	console.log('size', size);
	console.log('type', type);
	console.log('screen', screen);
	console.log('price', price);
	console.log('discount', discount);
}

// 优化  建造者模式

function getPhone({ size, type = 'iOS', screen = 'OLED', price = 100, discount } = {}) {
	console.log('size', size);
	console.log('type', type);
	console.log('screen', screen);
	console.log('price', price);
	console.log('discount', discount);
}

getPhone({ size: 4, discount: 0.1, type: 'android' }); // 只需要传递需要的参数

// 1.避免呢参数顺序
// 2.在扩展时不需要担心其他地方调用会不会有问题

// 可以直接通过对象传递参数
