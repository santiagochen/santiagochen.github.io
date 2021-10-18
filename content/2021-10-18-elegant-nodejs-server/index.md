---
title: 如何更加优雅的实现一个nodejs后台
date: "2021-10-18 08:10"
path: blog/elegant-nodejs-server
cover: ./placeholder.jpg
draft: false
tags: [ nodejs ]
excerpt: "更加优雅的实现一个nodejs后台"
---

## 目录
- [前言:我们经常遇到一些场景](#前言:我们经常遇到一些场景)

- [如何优雅](#如何优雅)

- [举例实现](#举例实现)

------

### 前言:我们经常遇到一些场景
1. 写了个项目，隔了一周时间，再去回忆时，发现代码逻辑晦涩难懂(因为业务逻辑可能有些模糊了)
2. 代码又臭又长，很不利于观察整体逻辑，一眼看到的基本上都是局部
3. 逻辑模块混杂，业务耦合严重，相互交织，难于维护

### 如何优雅
1. 入口清晰，定义简练
2. 注意功能模块区分清晰
  - 服务入口结构清晰 app.js
  - 调用链路简单纯粹: 路由->(局部中间件)->控制器模块(+工具模块，+数据模块，+配置模块实现业务逻辑)
  - 模块分工明确
    - 路由模块: 定义路由
    - 中间件模块: 定义中间件
    - 工具模块: 定义辅助方法
    - 控制器模块: 定义业务实现，可能涉及引用周边一些模块
    - 数据模块: 定义数据查询
    - 配置模块: 定义全局数据常量
3. 注意全局常量只在配置模块中定义，业务中使用需引用配置
4. 注意抽象通用方法，归纳与工具模块 

### 举例实现
show code之前，我们想要的是尽可能让调用链清晰，简单化; 所以我们理论上应该在实现的过程中首先做到功能模块分类明确；另外关于调用我们也可以假设它就是一棵树干，主干是最粗的，一眼清晰可见，如果需要了解细节，又能够通过树干的分支逐一梳理。其实这样和我们的国家职能模块的设置一样：我们国家有省，省下有市，我们在某个地方遇到具体问题时，怎可以顺着区域划分，职能管辖找到当地的某个负责部门(因为他们就准备负责干某件事)去寻求帮助，平时我们却不用关注他们具体是干什么的。

于是，我们就想象着一棵树的样子(一眼望去主干清晰，顺着枝干去梳理，又能发现其枝繁叶茂，一层层拨开了看，才能逐步去了解每个枝干的细节)去实现一个项目即可, 下面我们借助koa-booster去实现这样一个项目。

- 安装
```
npm i -g koa-booster-cli
```
- 创建项目和启动
```
kb create kb-demo 
cd kb-demo
npm i
node app
```

- 入口
我们就实例化一个koa, 加入一些全局的要素，例如全局中间件
```
const Koa = require('koa')
const app = new Koa()
module.exports = require('koa-booster')(app, {
  middlewares : app=>[
    require('koa-body')(),
    require('koa-static')('public'),
  ]
})
```
默认127.0.0.1:3000, 需要自定义时就定义一下端口和host, 像这样
```
module.exports = require('koa-booster')(app, {
  host: '0.0.0.0',
  port: 5001,
  middlewares : app=>[
    require('koa-body')(),
    require('koa-static')('public'),
  ]
})
```

- 路由 全部归纳在router这个文件夹中
实现简单，文件名为index则路由前缀为/; 如果为user, 则该文件所实现的路由前缀都为/user; 具体文件内容就如下
- 命令行新建 ``` kb generate router {路由名称} ```
- 实现
  ```
  module.exports = (app) =>{
    const { router, controller, middlewares } = app
    //router.use(middlewares['your-custom-middleware']()) 挂载一个该路由/下所有相关路由的中间件
    router.get('/',  controller.demo.t1 ) 
    router.get('/:id', middlewares.m2(), controller.demo.t2 ) //挂载一个该路由/:id下的中间件
  }
  ```
  这里每个模块文件都可以基于函数模式传入一个app, 即:
  ```
  module.exports = (app) =>{ 
    //这里面就能引用这个app
    //app中包含了我们希望几个功能模块: router, controller, service, middlewares, utils, config
    const { router, controller, service, middlewares, utils, config } = app
  }
  ```

- 中间件
  - 命令行新建 ``` kb generate middlewares {中间件名称} ```
  - 实现
    ```
    module.exports = (options)=>{
      return async (ctx, next)=>{
        ... //这里实现该管道的一些逻辑
        await next()
      }
    }
    ```
  - 引用
    ```
    app.use( app.middlewares['your-custom-middleware']() )
    ```

- 控制器 业务实现代码就在这里了(理论情况下，我们希望的是只有这里才会实现业务相关的代码，其它模块中实现的应该都是原子功能的，都是抽象的，可复用的内容，这一点很重要！因为它会让我们的代码组织的如同树干一样干净，强壮) 例如: 
```
module.exports = (app)=>({
  async t1(ctx){
    try {
      let data = await ctx.service.demo.t1()
      ctx.body = {
        globalMidName:ctx.globalMidName,
        privateMidName: ctx.privateMidName,
        classGrp: data
      }
    } catch (error) {
      console.error(error)
    }
  }
})
```
在控制器里面我们除了能在app下获取到router, controller, service, middlewares, utils, config这几个模块；我们还能通基于ctx来获取。
```
module.exports = (app) =>{ 
  const { router, controller, service, middlewares, utils, config } = app
  async t1(ctx){
    try {
      const { router, controller, service, middlewares, utils, config } = ctx
    } catch (error) {
      console.error(error)
    }
  }
}
```

这里的实现我们就特别注意下面几件事, 因为这样做会让我们的代码更可读，更合理！
- 抽象提炼公共方法, 放置于utils内。 关于utils的实现:
  - utils文件夹内的文件则为utils的子集
  - 命令行新建 ``` kb generate utils common ```
  - 实现代码如下: 
    ```
    module.exports = ()=>require('underscore') //直接引用了underscore
    ```
  - 引用 ``` app.utils.common.pluck() ```
  - 当然你也可以自定义成一个方法集
  - 命令行新建 ``` kb generate utils helper ```
  - 实现
    ```
    const _ = require('underscore')
    module.exports = (app)=>({
      getClassById(id){
        return _.findWhere( app.config.classInfo, { id: id } )
      }
    })
    ```
  - 那么引用时则可以这样 ``` app.utils.helper.getClassById(...) ```

- 提取公共配置, 放置于config内。关于config的实现:
  - 实现
    ``` 
    module.exports = {
      ...
    }
    ```
  - 引用
    ```
    app.config[field]
    ```

- 抽象出来的原子数据方法，与数据打交道的，抽象出来都放这里, 放置于service内。关于service的实现:
  - 命令行新建 ``` kb generate service user ```
  - 实现
    ``` 
    module.exports = (app)=>({
      get(userId){
        return app.config.db.query( "select * from user where id = :userId", [ userId ] )
      }
    })
    ```
  - 引用时 ```const userInfo = await app.service.user.get(...) ```





