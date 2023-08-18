// 场景
// 实现全局loading，但会被覆盖

// 优化

let fullscreenLoading;

const Loading = (options = {}) => {
	// options 不传的话默认是 fullscreen
	options = merge({}, defaults, options);
	if (options.fullscreen && fullscreenLoading) {
		return fullscreenLoading; // 存在直接 return
	}

	let parent = options.body ? document.body : options.target;
	let instance = new LoadingConstructor({
		el: document.createElement('div'),
		data: options,
	});

	if (options.fullscreen) {
		fullscreenLoading = instance;
	}
	return instance;
};

/**
 * 总结：
 * 目标：保证全局对象是唯一的，单位时间内最多只能有一个实例
 */