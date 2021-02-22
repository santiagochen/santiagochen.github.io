---
title: Markdown in React
date: "2020-12-26 18:00"
path: blog/markdown-in-react
cover: ./placeholder.jpg
draft: false
tags: [ reactjs ]
excerpt: "记录点滴: react-markdown是一款非常优秀的markdown转html的react组件，但是官方文档是全英文而且也没有说明的太详细，把开发遇到的问题以及实践方法记录下来。"
---

### Markdown in React
- 准备
  - dependency: react-markdown
- 背景
  - [react-markdown文档说明](https://github.com/remarkjs/react-markdown)
- 基础DEMO
  -  
    ```
    import ReactMarkdown from 'react-markdown'
    const Demo = ({file})=>{
      const md = `## Hello, basic demo.`
      return (
        <ReactMarkdown children={md} />
      )
    }
    export default Demo
    ```
- 升级(md内容单独出来)
  - 组件结构
    ```
    PageA
      index.js
      index.md
    ```
  - index.js代码
    ```
    import React,{ useState, useEffect } from 'react';
    import ReactMarkdown from 'react-markdown'
    import source from './index.md';
    const Demo = ()=>{
      const [md, setMd] = useState(null);
      useEffect(async () => {
        const response = await fetch(source)
        const text = await response.text()
        setMd(text);
      });
      return (
        <>
          <ReactMarkdown children={md} />
        </>
      )
    }
    export default Demo
    ```
  - 关键点
    - 引入方式

      1. 
          ```
          import source from './index.md';
          await fetch(source)
          ```
      2. 
          ```
          await fetch(require('./index.md').default)
          ```
    - 获取md内容方式
      ```
      const response = await fetch(source)
      const text = await response.text()
      ```