---
title: 细说React-Redux
date: "2019-02-06 18:00"
path: blog/happy-talk-about-react-redux
cover: ./placeholder.jpg
draft: false
tags: [ reactjs ]
excerpt: "记录点滴: 从redux过度到了react-redux。记录下相关的有趣的一些点。"
---

### Happy Talk about React Redux

#### 来到[React Redux官网](https://react-redux.js.org/), 了解了下内容得到以下几点重要信息：
 - 它为什么出现:
    本身Redux是一个独立的库，它其实可以不仅仅用于react;为了让它更好的服务于react,于是有了react redux的出现。React Redux就是官方与React所绑定的Redux库。它为我们提供了一种合理的途径来进行数据与UI之间的绑定，这让我们的代码更加合理也同时又降低了一些使用门槛。
 - 它的特点: 
  React-Redux 将所有组件分成两大类：
    - UI 组件（presentational component）这是开发者需要自己的业务实现组件
      - 只负责 UI 的呈现，不带有任何业务逻辑
      - 没有状态（即不使用this.state这个变量）
      - 所有数据都由参数（this.props）提供
      - 不使用任何 Redux 的 API
    - 容器组件（container component）容器组件由 React-Redux 自动生成
      - 负责管理数据和业务逻辑，不负责 UI 的呈现
      - 带有内部状态
      - 使用 Redux 的 API
      - **这里划重点!!!**
        ```
        import { connect } from 'react-redux'
        const VisibleTodoList = connect()(TodoList);
        ```

#### 应用的关键
- [Provider, \<Provider store={store}\>](#Provider描述)
- [createStore, const store=createStore(reducer)](#createStore描述)
- [connect(mapStateToProps?, mapDispatchToProps? )](#connect描述)

### Provider描述

原文为:

The <Provider /> makes the Redux store available to any nested components that have been wrapped in the connect() function.

翻译成中国话就是: 

Provider让任何嵌套组件(注意前提!!!它的被connect()包裹着才行哦!!!)都能获取到Redux的数据
### createStore描述
创建一个数据池，供Provide使用

### connect描述
  connect : 用来连接react组件和redux store, 生成react-redux的容器组件
  - 参数 
    - mapStateToProps : 前者负责输入逻辑, 即将state映射到 UI 组件的参数（props）
    - mapDispatchToProps : 后者负责输出逻辑, 即将用户对 UI 组件的操作映射成 Action
    ```
    import { connect } from 'react-redux'
    const VisibleTodoList = connect(
      mapStateToProps,
      mapDispatchToProps
    )(TodoList)
    ```

