---
title: scrapy.com
date: "2021-09-15 14:00"
path: blog/scrapy
draft: false
cover: ./scrapylogo.png
tags: [ 悦读 ]
excerpt: "悦读"
---

### scrapy
- [遇见scrapy](./遇见scrapy)
- 安装

------
#### 遇见scrapy
- 它作用很多，例如数据挖掘，信息处理，历史搜集等
- 给了个例子
  ```python
  import scrapy


  class QuotesSpider(scrapy.Spider):
      name = 'quotes'
      start_urls = [
          'http://quotes.toscrape.com/tag/humor/',
      ]

      def parse(self, response):
          for quote in response.css('div.quote'):
              yield {
                  'author': quote.xpath('span/small/text()').get(),
                  'text': quote.css('span.text::text').get(),
              }

          next_page = response.css('li.next a::attr("href")').get()
          if next_page is not None:
              yield response.follow(next_page, self.parse)
  ```
- 执行它 ``` scrapy runspider quotes_spider.py -o quotes.jl ```
- 执行结果 
  ```json
  {"author": "Jane Austen", "text": "\u201cThe person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.\u201d"}
  {"author": "Steve Martin", "text": "\u201cA day without sunshine is like, you know, night.\u201d"}
  {"author": "Garrison Keillor", "text": "\u201cAnyone who thinks sitting in church can make you a Christian must also think that sitting in a garage can make you a car.\u201d"}
  ...
  ```
- 发生了什么?
  执行 scrapy runspider quotes_spider.py 的时候, scrapy就通过它的爬虫引擎让