// 场景
// 网络请求中，我们一般使用 axios 库，支持用 Promise 风格调用。

axios
	.get('/api/user', {
		params: {
			ID: '123',
		},
	})
	.then(function (response) {
		console.log(response);
	})
	.catch(function (error) {
		console.log(error);
	});

axios
	.post(
		'/api/user',
		{
			firstName: 'wind',
			lastName: 'liang',
		},
		{
			headers: { 'Content-Type': 'application/json' },
		}
	)
	.then(function (response) {
		console.log(response);
	})
	.catch(function (error) {
		console.log(error);
	});

// get 和 post 传参并不统一，使用起来会比较繁琐，post 还需要手动传递 headers 。

// 优化 
// request.js
import axios from 'axios';
export const get = function (url, params) {
	return axios.get(url, { params });
};

export const post = function (url, params) {
	return axios.post(url, { ...params }, { headers: { 'Content-Type': 'application/json' } });
};

// 业务代码
import { get, post } from './request';

get('/api/user', {
	ID: '123',
})
	.then(function (response) {
		console.log(response);
	})
	.catch(function (error) {
		console.log(error);
	});

post('/api/user', {
	firstName: 'wind',
	lastName: 'liang',
})
	.then(function (response) {
		console.log(response);
	})
	.catch(function (error) {
		console.log(error);
	});


// 门面模式的优点：
// 1.简化的我们的调用
// 2.能够将底层的调用封装

// 门面模式、适配器模式、代理模式的区别
// ===》 意图不一样
// 1.适配器：为了解决两个对象之间字段不一致的问题
// 2.代理模式：增强原先对象的能力，提供的字段不变
// 3.门面模式：将比较复杂的调用封装，提供一个新的接口给用户使用
