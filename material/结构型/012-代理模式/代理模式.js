// 场景
// 平常业务开发中， 对于网络请求，我们一般会封装成一个模块，并且暴露 get、post 方法供大家使用。

// src/util/request.js
import Http from '../http';

export function get(options) {
    return Http.get(options);
}

export function post(obj) {
    return Http.post(options);
}

// Http 模块主要是将 ajax 请求封装，填充一些 headers 等等，然后业务方使用的时候只需要引入上边的 get、post 即可。

import { post, get } from '@src/util/request';

async generateShareImage() {
  const body = this.generateConfig();
  try {
    const res = await post({
      url: '/getData',
      body,
      setting: {
        domain: config.getExhibitionDomain(),
      },
    });
    if (res?.picUrl) {
      return res;
    }
    return null;
  } catch (error) {
    log.error(`失败`, JSON.stringify(error));
  }
  return null;
}

// 现在有了一个新需求，我们需要将第一次请求中，后端返回请求中的 graytype 字段塞到后续请求中的 headers ，也就是下边这样。

import { post, get } from 'src/util/request';
let graytype = -1;
async generateShareImage() {
  const body = this.generateConfig();
  try {
    const options = {
      url: '/getData',
      body,
      setting: {
        domain: config.getExhibitionDomain(),
      },
      headers: {
        
      }
    }
    // 之前拿到了 graytype 就塞入
    if (graytype !== -1) {
      	options.headers.graytype = graytype;
    }
    const res = await post(options);
    // 新增逻辑
    if (res.graytype !== undefined && res.graytype !== null) {
        graytype = res.graytype;
    }
    if (res?.picUrl) {
      return res;
    }
    return null;
  } catch (error) {
    log.error(`失败`, JSON.stringify(error));
  }
  return null;
}

// 优化

// src/util/requestNew.js

import { post as Post, get as Get } from './request.js';

let graytype = -1;

const getNewParams = (params) => {
    let newParams = undefined
    // 将 graytype 加入
    if (graytype !== -1) {
        newParams = {
            ...params,
            headers: {
                ...params.headers,
                graytype,
            },
        };
    }
    return newParams;
};
export const get = async (params) => {
    const response = await Get(getNewParams(params));
    const res = response.data;
    if (res.graytype !== undefined && res.graytype !== null) {
        graytype = res.graytype;
    }
    return response;
};
export const post = async (params) => {
    const response = await Post(getNewParams(params));
    const res = response.data;
    if (res.graytype !== undefined && res.graytype !== null) {
        graytype = res.graytype;
    }
    return response;
};

// 代理模式 对原有对象、函数再包装一层，并且保证跟原有对象行为一致
// Q：为什么不直接改元对象？
// A：
//   1.不能影响别人，
//   2.不符合SPA【单一职责原则】，直接修改对象，会增加对象的复杂度，