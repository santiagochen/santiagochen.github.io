---
title: flask
date: "2021-09-20"
path: blog/flask
draft: false
cover: ./images/flask-logo.png
tags: [ 悦读 ]
excerpt: "悦读"
---

### flask
- 准备
  - ``` mkdir todos ```
  - ``` python3 -m venv venv ```
  - ``` pip install Flask ```

- 最简单的主文件
  ```
  from flask import Flask
  app = Flask(__name__)
  @app.route("/")
  def hello_world():
      return "<p>hhh</p>"
  ```

- 配置
  ```
  $ export FLASK_APP=hello
  $ export FLASK_ENV=development
  $ flask run
  ```