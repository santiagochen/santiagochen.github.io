module.exports = {
  pathPrefix: '',
  siteUrl: 'https://santiagochen.com',
  siteTitle: '关注技术，放眼全局',
  siteDescription: '关注技术，放眼全局，不会产品设计的开发不是个好的项目管理',
  author: {
    firstName: "Santiago",
    lastName: "Chen",
    fullName: "Santiago Chen"
  },
  highlight:{
    p1: `关注技术，放眼全局，不会产品设计的开发不是个好的项目管理`,
    p2: `Currently I work mostly with Javascript technologies like ReactJS and NodeJS. I also
    have hands on experience working with cloud infrastructures like <b>AWS/GCP</b> and have deployed applications
    keeping scalability in mind. Docker, Kubernetes, Jenkins, SonarQube are some of the cool
    tools I use for <b>CI/ CD</b>. I'm always a learner and a self taught programmer.`
  },
  mailAdress: "545438641@qq.com",
  postsForArchivePage: 3,
  defaultLanguage: 'en',
  //disqusScript: process.env.DISQUS_SCRIPT || 'https://santiagochen.disqus.com/embed.js',
  pages: {
    home: '/',
    blog: 'blog',
    contact: 'contact',
    resume: 'resume',
    tag: 'tags',
  },
  social: {
    github: 'https://github.com/santiagochen',
    // facebook: 'https://www.facebook.com/rolwin.monteiro',
    // twitter: 'https://twitter.com/rolwin100',
    // instagram: 'https://www.instagram.com/reevan100/'
  },
  contactFormUrl: process.env.CONTACT_FORM_ENDPOINT || 'https://getform.io/f/09a3066f-c638-40db-ad59-05e4ed71e451',
  tags: {
    javascript: {
      name: 'javascript',
      description: 'JavaScript（简称“JS”） 是一种具有函数优先的轻量级，解释型或即时编译型的编程语言。',
      color: '#f0da50',
    },
    nodejs: {
      name: 'Node.js',
      description: 'Node.js发布于2009年5月，由Ryan Dahl开发，是一个基于Chrome V8引擎的JavaScript运行环境，使用了一个事件驱动、非阻塞式I/O模型，让JavaScript 运行在服务端的开发平台，它让JavaScript成为与PHP、Python、Perl、Ruby等服务端语言平起平坐的脚本语言。',
      color: '#90c53f',
    },
    typescript: {
      name: 'typescript',
      description: 'TypeScript是微软开发的一个开源的编程语言，通过在JavaScript的基础上添加静态类型定义构建而成。TypeScript通过TypeScript编译器或Babel转译为JavaScript代码，可运行在任何浏览器，任何操作系统。',
      color: '#257acc',
    },
    reactjs: {
      name: 'reactjs',
      description: 'React 起源于 Facebook 的内部项目，因为该公司对市场上所有 JavaScript MVC 框架，都不满意，就决定自己写一套，用来架设Instagram 的网站。做出来以后，发现这套东西很好用，就在2013年5月开源了。',
      color: '#61dbfa',
    },
    gatsby: {
      name: 'Gatsby.js',
      description: 'Gatsby 是一个基于 React 的免费、开源框架，用于帮助 开发者构建运行速度极快的 网站 和 应用程序。',
      color: '#6f309f',
    },
    html: {
      name: 'HTML',
      description: 'HTML称为超文本标记语言，是一种标记语言。它包括一系列标签．通过这些标签可以将网络上的文档格式统一，使分散的Internet资源连接为一个逻辑整体。',
      color: '#dd3431',
    },
    css: {
      name: 'css',
      description: '层叠样式表(英文全称：Cascading Style Sheets)是一种用来表现HTML（标准通用标记语言的一个应用）或XML（标准通用标记语言的一个子集）等文件样式的计算机语言。',
      color: '#43ace0',
    },
    python: {
      name: 'python',
      description: 'Python由荷兰数学和计算机科学研究学会的Guido van Rossum 于1990 年代初设计，作为一门叫做ABC语言的替代品。Python提供了高效的高级数据结构，还能简单有效地面向对象编程。',
      color: '#f9c646',
    },
    abac: {
      name: 'ABAC',
      description: 'ABAC(Attribute Based Access Control)指基于属性的访问控制, 当然想参考的则是RBAC(Role Based Access Control)指基于角色的访问控制',
      color: '#f0da50',
    },

    "悦读": {
      name: '悦读',
      description: '人生有涯，读书无界，虽不曾巍巍乎高山，潺潺乎流水，妙文佳句似曾相识燕归来，亦是人生一大快事，一大乐事',
      color: '#4e6ef2',
    },

  },
};
