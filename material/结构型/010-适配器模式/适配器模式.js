// 场景
// 在使用第三方库，当前返回接口与第三方接口不一致
// 使用一个 Table 的组件，它要求我们返回的表格数据格式如下：


// 业务所需要的
{
  code: 0, // 业务 code
  msg: '', // 出错时候的提示
  data: {
     total: , // 总数量
     list: [], // 表格列表
  }
};

// 后端返回的数据可能是这样的：
{
  code: 0, // 业务 code
  message: '', // 出错时候的提示
  data: {
     total: , // 总数量
     records: [], // 表格列表
  }
};

// 优化
// 提供一个 responseProcessor 的钩子函数，
{
  ...
  responseProcessor(res) {
    return {
      ...res,
      msg: res.message, // 出错时候的提示
      data: {
         ...res.data
         list: res?.data?.records || [], // 表格列表
      }
    };
  },
  ...
  
}

// 问题 ：适配器模式与代理模式的区别
// A：意图不一样
//    适配器模式：为了解决两个对象之间数据不匹配的问题，原对象这时候不好修改，使用adapter进行一层转换
//    代理模式：只是为了增强原对象的一些能力，提供的接口数据不会变