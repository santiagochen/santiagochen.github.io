---
title: 商品码同步实战总结
date: "2021-05-02 20:00"
path: blog/good-practise-sync-code
draft: false
cover: ./placeholder.jpg
tags: [ nodejs ]
excerpt: "项目总结"
---

### 货物码同步总结
- ![示意图](./demo.png)
- 面临的场景
  - 描述: 对商品生成，装箱，一层层包装，一步步物流这整个流程的数据同步
  - 需要做什么
    - 记录商品,dozen,箱,托等等各层包装他们之间的关系
    - 记录每一步物流的信息（付费客户就多个上区块链的服务）
    - 保证消费者最终消费商品时，我们能提供该商品完整的物流信息链条

- 抽象化
  - 商品-dozen-箱-托 即等同于菜单关系，它们之间是多级的树形关系。
  - 每一环的物流信息 即为捆绑在每一个树节点上所发生的故事

- 表设计
  - flow 

      | id | detail | addr | ... |
      | --- | --- |  --- | --- |
      | 1 | JSON.stringify({...}) | 上海 | ... |
      | 2 | JSON.stringify({...}) | 连云港 | ... |
    
    说明:
      - id:自增id; 
      - detail:物流信息(不需要理解的数据都存一起就是了); 
      - addr:发生地点， 等等其他需要理解的字段(理解的字段可以理解为后续可能需要作筛选过滤条件的)
  - relation_flow_item

      | flowid | itemid |
      | --- | --- |
      | 1 | 25 |
      | 2 | 24 |
    
    说明:
      - flowid 物流ID
      - itemid 物品ID
  - item 

      | id | name | qrcode | pid | link | ... |
      | --- | --- |  --- | --- | --- | --- |
      | 1 | x1 | balabala1 | 0 | 0_1 | ... |
      | 2 | x2 | balabala2 | 1 | 0_1_2 | ... |
      | 3 | x3 | balabala2 | 2 | 0_1_2_3 | ... |
    
    说明:
      - id 物品ID(自增ID而已)
      - name 物品名称(这里的物品既可能是商品，也肯能是包装商品的一箱，或者更大的商品集合。总之他们各自肯定是有个标识)
      - qrcode 物品标识码或标识链接(实际生产物流环节中肯定会有这个标识)
      - pid 他们的上一层物品ID
      - link 完整的货物集合历史链条。如包含关系：超大托A>托B>箱子C>货物D