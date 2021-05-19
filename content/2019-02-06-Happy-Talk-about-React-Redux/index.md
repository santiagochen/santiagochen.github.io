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
- [概述](#概述)
- [关键词](#关键词)
- [Hello World](#Hello-World)


#### 概述
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

#### 关键词
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
  #### 连接组件和redux-store
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

### Hello World
> 我们以官网的todos例子来说明
- index.js里面直接用Provide包裹整个应用; store具体是什么?? 我们先hold住，把这个[梗](#梗)记住，先把全局过一遍，细节一会解释。
```
import { Provider } from "react-redux";
import store from "./redux/store";
<Provider store={store}>
  <App />
</Provider>,
```
- 然后我们接着看App可以怎么定义: **嵌入了AddTodo,TodoList和VisibilityFilters三个组件**
```
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import VisibilityFilters from "./components/VisibilityFilters";

export default function TodoApp() {
  return (
    <div className="todo-app">
      ...
      <AddTodo />
      <TodoList />
      <VisibilityFilters />
    </div>
  );
}
```
- #### 先看AddTodo这个组件,注意两点:
  - 暴露组件用的是 **export default connnect(...)(AddTodo)** 这个格式！！！它就是我们前面提到的 [连接组件和redux-store](#连接组件和redux-store)
  - connect(null, { addTodo }) 它写成这样更能让你引起注意 connect(null, { "addTodo" : addTodo }); 注意重点！前面说过connect的参数(第一个输入, 第二个输出)，现在这里是输出(缺少输入, [定义输入的例子看这里](#TodoList))，其实是对应props。{ "addTodo" : addTodo } 表示 this.props.addTodo = addTodo; 这里的后者addTodo来自"../redux/actions"。所以接下来我们赶紧看下这个文件
```
import { connect } from "c";
import { addTodo } from "../redux/actions";
class AddTodo extends React.Component {
  ...
  handleAddTodo = () => {
    this.props.addTodo(this.state.input);
    this.setState({ input: "" });
  };
  ...
  <button className="add-todo" onClick={this.handleAddTodo}>
    Add Todo
  </button>
}
export default connect(null, { addTodo })(AddTodo);
```
- ../redux/actions 这里面原来就是定义了返回什么。 以addTodo来看, 
  - 原来connector的第二个参数(输出)是个返回函数，
  - 返回的内容格式固定为: {type:..., payload:...} type为名称(actionTypes就是起到个定义常量类型的作用), payload为传递的内容
```
import { ADD_TODO, TOGGLE_TODO, SET_FILTER } from "./actionTypes";
let nextTodoId = 0;
export const addTodo = content => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    content
  }
});
export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: { id }
});
export const setFilter = ...
```
- 到这步我们回到AddTodo这个组件聚焦到它的实现主线：input输入中todo的名称，点击Add Todo就新增这个todo. 
  - 
    ```
    handleAddTodo = () => {
      this.props.addTodo(this.state.input);
      this.setState({ input: "" });
    };
    <button className="add-todo" onClick={this.handleAddTodo}> 
    ```
  - 划重点！！！ 
    - 假想: 如果我们不用redux，这里应该是会通过prop传入一个todos的集合, 在发生新增动作时把新的todo加入todos的集合(组件间逐层传递需要的数据)
    - 现状: 我们通过connector的第二个参数(输出)定义好一个返回函数: 
      ```
      ()=>{type: ..., payload: ...}
      ```
    - 思考差异: 你们有发觉目前现状少了步骤吗?! 
      - 假想中props传入了todos集合, 新增动作发生时把todo加入。如果说用户点击是**触发点**, todo是**货物的内容**，把货物归于todos这个仓库就是**发生的事件**
      - 现状中新增动作一样，**触发点**同样是用户点击, **货物的内容**是{type:..., payload:...}中的**payload**, 把货物怎么处理的**发生的事件**却没有！
      - 很显然不去处理货物是不完整的！！！这里react redux是怎么帮我们处理的呢？ 我们别忘了还有**type**! 还记得这句话吗？“Provider让任何嵌套组件(注意前提!!!它的被connect()包裹着才行哦!!!)都能获取到Redux的数据” React Redux就是让数据不用逐层传递，全局可获取，集中化管理，那么肯定还会有个与这个**type**对应的**发生的事件**
- #### “梗” 还记[这个梗](#Hello-World)吗? "store具体是什么??"
  为了探究**发生的事件**，我们就继续看看这个store是什么。
  - ./redux/store 它图通过redux.createStore实例化了store给Provider用。我们可以认为它就是我们这个应用中的数据池了; createStore它消耗了一个参数:reducers
    ```
    import { createStore } from "redux";
    import rootReducer from "./reducers";
    export default createStore(rootReducer);
    ```
  - ./reducers 这里用到了redux.combineReducers(他合并reducer), 这只是插曲！我们的目标是探索**发生的事件**是哪里定义？如何和前面的**货物**关联起来！所以我们应该关注合并的**reducer**! 
    ```
    import { combineReducers } from "redux";
    import visibilityFilter from "./visibilityFilter";
    import todos from "./todos";
    export default combineReducers({ todos, visibilityFilter });
    ```
- reducer: "./todos" 看到这个名字，我预感离真相已经不远了。 看看这里定义了什么吧:
  - 暴露了个function( state, action )
  - function中逻辑为: 根据**action.type**类型，返回与之相应的内容
  - 返回与之相应的内容是什么??? 仔细看!!! 它这里其实正是在实现一个**货物**归仓的**事件**。 看到这就完全明了了react redux是如何实现**触发点**, **货物的内容**，以及**发生的事件**的全部了。
  ```
  import { ADD_TODO, TOGGLE_TODO } from "../actionTypes";
  const initialState = {
    allIds: [],
    byIds: {}
  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case ADD_TODO: {
        const { id, content } = action.payload;
        return {
          ...state,
          allIds: [...state.allIds, id],
          byIds: {
            ...state.byIds,
            [id]: {
              content,
              completed: false
            }
          }
        };
      }
      case TOGGLE_TODO: {
        const { id } = action.payload;
        return {
          ...state,
          byIds: {
            ...state.byIds,
            [id]: {
              ...state.byIds[id],
              completed: !state.byIds[id].completed
            }
          }
        };
      }
      default:
        return state;
    }
  }
  ```
- #### TodoList 

  ( 这里面缺少输出, [定义输出的例子看这里](#先看AddTodo这个组件,注意两点:) )

  别忘了，我们还没讨论connector的输入(该组件内获取使用)。现在看看TodoList这里的Connector的参数：输入定义

- #### 看代码中的关键：
  - 这里的todos从哪来的？父级定义中没提供。
    ```
    TodoList = ({ todos }) => (
    ```
    ```
    export default function TodoApp() {
      return (
        <div className="todo-app">
          <h1>Todo List</h1>
          <AddTodo />
          <TodoList />
          <VisibilityFilters />
        </div>
      );
    }
    ```
  - 输入的定义，它负责提供了组件内部所需的这个todos。 所以它最终返回是 { todos: todos }。于是该组件内拿到了todos数据用来后续的渲染。
  ```
  const mapStateToProps = (state) => {
    const { visibilityFilter } = state;
    const todos = getTodosByVisibilityFilter(state, visibilityFilter);
    return { todos };
  };
  export default connect(mapStateToProps)(TodoList);
  ```
  - state是什么？我们留意到state中有个visibilityFilter，其实state就是我们前面redux.combineReducers(他合并reducer)所产生的数据池。state.visibilityFilter就是对应visibilityFilter的数据。


- 最后来个极简总结
  - Provider包裹App，
  - Provide的store由redux.createStore生成
  - connector连接react组件(业务内容与逻辑)和Redux Store; connector(输入:{'xxx': 输入数据 }，输出:{'xxx': 货物内容 })(组件) (**触发点**，**货物**)
  - redux.createStore中定义reducer(要发生的事件)
  - reducer(state, action) state为初始值， action为事件类型 (**发生的事件**)
  - 简写代码
    ```
    <Provider store>
    <App>
    <redux-components>
    </App>
    <Provider>

    Provider.store = redux.createStore( redux.combineReducers( {reducerA, reducerB} ) )
    reducers.A = function(state = initialState, action) {
      //inistialState为该数据初始值
      //action是触发点触发后dispatch的货物，
      //action的格式通常定为{type: ..., payload: ...}; type为该货物的标识, reducer中根据type做出相应的事件反应; payload为货物信息。
      return state; //或者更复杂的数据 例如: {state, a, b, ...}
    }
    redux-component-A = ReactRedux.connector(ReduxIn, ReduxOut)(component-A)

    //state为Redux的数据池，能获得定义过的全部数据, 名字在redux.combineReducers( {reducerA, reducerB} )中就确定了
    ReduxIn = (state)=>{
      return { a:A, b:B } 
      //a,b都是供组件内使用，传递state中的数据进入组件中
      //A和B是传入的数据, 可能是由state的数据进行组装而来的
    }

    ReduxOut = {
      a:A, b:B 
      //a, b都会在组件中使用，某事件发生时，派发消息，消息可以将组件中的数据一并传出来，并最终到达Provider.store。
      //A和B的通常格式为{type, payload}
    }

    //React-Redux则会在Reducer内定义根据action.type来监听并响应以做出反应
    ```
  

  



