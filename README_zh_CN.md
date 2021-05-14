[English](README.md) | [简体中文](README_zh_CN.md)



# Genshin Schedule

Genshin Schedule 是一个用于帮助你规划《原神》中与时间相关的活动的网站.

更多信息请访问: [genshin.chiya.dev](https://genshin.chiya.dev).

![home](images/home.png)

## 从源代码构建

这个网站由两个子项目 [web](web) 和 [sync](sync) 组成.

- `web` 前端网页
- `sync` 后端, 处理API请求

详细构建过程请前往子项目查看.

你也可以使用提供的 Dockerfile 来构建生产镜像.
- 文件: [web](Dockerfile.web), [sync](Dockerfile.sync).

原文: You may use the provided Dockerfiles ([web](Dockerfile.web) and [sync](Dockerfile.sync)) to generate production images. 
