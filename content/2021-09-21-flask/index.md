---
title: flask
date: "2021-09-21"
path: blog/flask
draft: false
cover: ./flask-logo.png
tags: [ 悦读 ]
excerpt: "悦读"
---

### flask
- [虚拟环境](#虚拟环境)
- [开始上手](#开始上手)

------

#### 虚拟环境
- 随着你的 Python 项目越来越多，你会发现不同的项目 会需要不同的版本的 Python 库。同一个 Python 库的不同版本可能不兼容。虚拟环境可以为每一个项目安装独立的 Python 库，这样就可以隔离不同项目之 间的 Python 库，也可以隔离项目与操作系统之间的 Python 库。
- 创建
```
  python3 -m venv venv
```
- 激活
```
. venv/bin/activate
```
- 安装 Flask
```
pip install Flask
```


#### 开始上手
- 一个最小的应用
  ```
  from flask import Flask

  app = Flask(__name__)

  @app.route("/")
  def hello_world():
      return "<p>Hello, World!</p>"
  ```
- 路由
  ``` 
  1. 基本: 
  @app1.route('/')
  2. 动态路由: 
  app.route('/user/<username>')
  3. 限定类型:
  @app1.route('/user/<int:userid>') //限定参数userid只能是整数
  4. 地址尾部的“/”:
  如果路由的尾部带有“/”，那么在浏览器的地址栏中输入“/”和不输入“/”的效果是一样的。如果路由的尾部没有“/”，那么在浏览器的地址栏中是不能输入“/”的，否则会出错。
  ```

- 运行参数
  ```
  1. debug模式
  debug=True 表示是运行在 Debug 模式下，默认是 production 
  2. 监听的主机
  app1.run(host=’0.0.0.0’) 
  配置项默认是 127.0.0.1，表示仅在本机上可以访问该 Web 服务器，其他机器是不可以访问的。为了让其他机器可以访问，可以将其设定为 0.0.0.0
  3. 端口号，默认的端口号是 5000，如果我们希望修改这个值，可以使用参数 port 来实现。
  app1.run(port=8080)
  ```

- 命令行启动
  ```
  Flask 自带有一个 Flask 命令

  通过设定环境变量 FLASK_APP=flaskDemo.py 来表示将要运行的应用是哪个，然后运行 flask run 来启动该应用。

  设定环境变量 FLASK_DEBUG=1 就可以在 Debug 模式下运行
  设定启动模式 FLASK_ENV=development
  ```

- 蓝图
它很好地简化了大型应用工作的方式，并提供给 Flask 扩展在应用上注册操作的核心方法。一个 Blueprint 对象与 Flask 应用对象的工作方式很像，但它确实不是一个应用，而是一个描述如何构建或扩展应用的蓝图; 把一个应用分解为一个蓝图的集合。这对大型应用是理想的。一个项目可以实例化一个应用对象，初始化几个扩展，并注册一集合的蓝图。
以 URL 前缀和/或子域名，在应用上注册一个蓝图。 URL 前缀/子域名中的参数即成为这个蓝图下的所有视图函数的共同的视图参数（默认情况下）。
在一个应用中用不同的 URL 规则多次注册一个蓝图。
通过蓝图提供模板过滤器、静态文件、模板和其它功能。一个蓝图不一定要实现应用或者视图函数。
