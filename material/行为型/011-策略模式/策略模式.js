// 场景
// 进入一个营销活动页面，会根据后端下发的不同type ，前端页面展示不同的弹窗。

async getMainData() {
  try {
    const res = await activityQuery(); // 请求后端数据
    this.styleType = res.styleType;
    if (this.styleType === STYLE_TYPE.Reward) {
      this.openMoneyPop();
    }else if (this.styleType === STYLE_TYPE.Waitreward) {
      this.openShareMoneyPop();
    } else if (this.styleType === STYLE_TYPE.Poster) {
      this.openPosterPop();
    } else if (this.styleType === STYLE_TYPE.Activity) {
      this.openActivityPop();
    } else if (this.styleType === STYLE_TYPE.Balance) {
      this.openBalancePop();
    } else if (this?.styleType === STYLE_TYPE.Cash) {
      this.openCashBalancePop();
    }
  } catch (error) {
    log.error(MODULENAME, '主接口异常', JSON.stringify(error));
  }
}

// 优化

import { openPop } from './popTypes';
async getMainData() {
  try {
    const res = await activityQuery(); // 请求后端数据
    openPop(res.styleType)
  } catch (error) {
    log.error(MODULENAME, '主接口异常', JSON.stringify(error));
  }
}

import { STYLE_TYPE } from './constant';

const popTypes = {
  [STYLE_TYPE.Reward]: function() {
    // ...
  },
  [STYLE_TYPE.Waitreward]: function() {
    // ...
  },
  [STYLE_TYPE.Poster]: function() {
    // ...
  },
  [STYLE_TYPE.Activity]: function() {
    // ...
  },
  [STYLE_TYPE.Balance]: function() {
    // ...
  },
  [STYLE_TYPE.Cash]: function() {
    // ...
  },
}

export function openPop(type){
  return popTypes[type]();
}


// 总结
// 当我们遇到很多 if else switch ，就可以i使用策略模式
// 优势：让我们把策略从业务代码里抽离出来，后续在扩展，无需深入业务，只需要增加新的策略